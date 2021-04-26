import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'

import { createFolder, editFolder, editCategory } from '~/core/actions'
import { useTexts, useFolders } from '~/core/hooks'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Select } from '~/ui/elements/select'
import { Input } from '~/ui/elements/input'
import { Radio } from '~/ui/elements/radio'
import { Button } from '~/ui/elements/button'
import { Break } from '~/ui/elements/break'

type Props = {
  params: boolean | {
    title: string
    category: string
    isEditFolder?: boolean
    isEditCatgory?: boolean
  }
  onClose: () => void
}

export const StorageSidebarPopupFolder: FC<Props> = ({
  params,
  onClose
}) => {
  const {
    initialFolder, initialCategory, isNewFolder, isEditFolder, isEditCategory
  } = parseParams(params)
  const { texts } = useTexts('storage')
  const { folders, categories } = useFolders()
  const [categoryRadioValue, setCategoryRadioValue] = useState<'select'|'new'>('select')
  const [categorySelectValue, setCategorySelectValue] = useState(initialCategory)
  const [categoryNameValue, setCategoryNameValue] = useState(isEditCategory ? initialCategory : '')
  const [folderNameValue, setFolderNameValue] = useState(initialFolder)
  const [categoryNameError, setCategoryNameError] = useState('')
  const [folderNameError, setFolderNameError] = useState('')
  const [loading, setLoading] = useState(false)

  const categoryOptions = useMemo(() => categories.map(category => ({
    text: category || texts.generalCategoryTitle,
    value: category
  })), [categories])

  const folderNames = useMemo(() => folders.map(({ title, category }) =>
    generateFolderName(title, category).toLowerCase()
  ), [folders])

  const handleChangeCategoryRadioValue = useCallback(value => {
    setCategoryRadioValue(value)
  }, [setCategoryRadioValue])

  const handleChangeCategorySelectValue = useCallback(value => {
    setCategorySelectValue(value)
  }, [setCategorySelectValue])

  const handleChangeCategoryNameValue = useCallback(value => {
    if (categoryNameError) {
      setCategoryNameError('')
    }
    value = value.replaceAll(':', '')
    setCategoryNameValue(value)
    return value
  }, [categoryNameError, setCategoryNameValue])

  const handleChangeFolderNameValue = useCallback(value => {
    if (folderNameError) {
      setFolderNameError('')
    }
    value = value.replaceAll(':', '')
    setFolderNameValue(value)
    return value
  }, [folderNameError, setFolderNameValue])

  const validate = useCallback(({
    folderValue,
    folderName,
    categoryValue,
    categoryName,
    isNewCategory
  }) => {
    let errors = false

    if (isNewFolder || isEditFolder) {
      if (!folderValue) {
        setFolderNameError(texts.errorFolderNameEmpty)
        errors = true
      } else if (
        folderNames.includes(folderName.toLowerCase())
      ) {
        setFolderNameError(texts.errorFolderNameExist)
        errors = true
      }
    }

    if (isNewCategory || isEditCategory) {
      if (!categoryValue) {
        setCategoryNameError(texts.errorCategoryNameEmpty)
        errors = true
      } else if (categories.includes(categoryName)) {
        setCategoryNameError(texts.errorCategoryNameExist)
        errors = true
      }
    }

    return errors
  }, [
    categories,
    folderNames,
    setCategoryNameError,
    setFolderNameError
  ])

  const handleSubmit = useCallback(async () => {
    const isNewCategory = categoryRadioValue === 'new'
    const folderValue = folderNameValue.trim()
    const categoryValue = ((isNewCategory || isEditCategory) ? categoryNameValue : categorySelectValue).trim()
    const categoryName = normalizeCategoryName(categoryValue, texts)
    const folderName = generateFolderName(folderNameValue, categoryName)

    const errors = validate({
      categoryValue, categoryName, isNewCategory,
      folderValue, folderName
    })
    if (errors) return

    setLoading(true)
    const success = isNewFolder ? await createFolder(
      folderName
    ).catch(err => {
      console.log(err)
    }) : (isEditFolder && typeof params === 'object') ? await editFolder(
      folderName,
      initialFolder,
      initialCategory
    ) : isEditCategory ? await editCategory(
      categoryName,
      initialCategory
    ) : null

    if (success) {
      onClose()
    }
  }, [
    folderNames,
    categoryRadioValue,
    categorySelectValue,
    categoryNameValue,
    folderNameValue,
    validate
  ])

  return (
    <SidebarPopup
      title={
        isNewFolder ? texts.folderNewTitle :
          isEditFolder ? texts.folderEditTitle :
            texts.categoryEditTitle
      }
      onClose={onClose}
    >
      <Form
        center
        onSubmit={handleSubmit}
      >
        <Break size={28} px/>

        {(isNewFolder || isEditFolder) && (
          <Fragment>
            <Radio
              name={texts.categoryTypeLabel}
              value={categoryRadioValue}
              options={[
                { text: texts.categoryExistingValue, value: 'select' },
                { text: texts.categoryNewValue, value: 'new' }
              ]}
              disabled={loading}
              onChange={handleChangeCategoryRadioValue}
            />
            <Break size={28} px/>
          </Fragment>
        )}

        {(categoryRadioValue === 'select' && !isEditCategory) ? (
          <Select
            name={texts.categoryLabel}
            label={texts.categoryLabel}
            value={categorySelectValue}
            options={categoryOptions}
            disabled={loading}
            onSelect={handleChangeCategorySelectValue}
          />
        ) : (
          <Input
            name={texts.categoryNameLabel}
            label={texts.categoryNameLabel}
            value={categoryNameValue}
            error={categoryNameError}
            readonly={loading}
            onInput={handleChangeCategoryNameValue}
          />
        )}
        <Break size={28} px/>

        {(isNewFolder || isEditFolder) && (
          <Fragment>
            <Input
              name={texts.folderNameLabel}
              label={texts.folderNameLabel}
              value={folderNameValue}
              error={folderNameError}
              readonly={loading}
              onInput={handleChangeFolderNameValue}
            />
            <Break size={28} px/>
          </Fragment>
        )}

        <Button
          type="submit"
          loading={loading}
          uppercase
          light
        >
          {texts.saveButton}
        </Button>
        <Break size={28} px/>
      </Form>
    </SidebarPopup>
  )
}

const parseParams = (params) => {
  if (typeof params === 'boolean') {
    return {
      initialFolder: '',
      initialCategory: '',
      isNewFolder: true,
      isEditFolder: false,
      isEditCategory: false
    }
  }

  const {
    title,
    category,
    isEditFolder,
    isEditCategory
  } = params

  return {
    initialFolder: title || '',
    initialCategory: category || '',
    isNewFolder: !isEditFolder && !isEditCategory,
    isEditFolder,
    isEditCategory,
    isReadonlyCategory: !isEditFolder && !isEditCategory && typeof category !== 'undefined'
  }
}

const normalizeCategoryName = (categoryValue: string, texts) =>
  categoryValue.toLowerCase() === texts.generalCategoryTitle.toLowerCase() ? '' : categoryValue

const generateFolderName = (folderValue: string, categoryName: string) =>
  `${folderValue}${categoryName ? `::${categoryName}` : ''}`
