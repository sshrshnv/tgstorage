import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'

import { createFolder, editFolder, editCategory } from '~/core/actions'
import { useTexts, useFolders } from '~/core/hooks'
import { generateFolderName, normalizeCategoryName } from '~/api'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Select } from '~/ui/elements/select'
import { Input } from '~/ui/elements/input'
import { Radio } from '~/ui/elements/radio'
import { Button } from '~/ui/elements/button'
import { Break } from '~/ui/elements/break'

import type { FolderPopupParams } from './storage.sidebar'

type Props = {
  params: FolderPopupParams
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
  const [categorySelectValue, setCategorySelectValue] = useState(initialFolder?.category || '')
  const [categoryNameValue, setCategoryNameValue] = useState(isEditCategory ? initialCategory : '')
  const [folderTitleValue, setFolderTitleValue] = useState(initialFolder?.title || '')
  const [categoryNameError, setCategoryNameError] = useState('')
  const [folderTitleError, setFolderTitleError] = useState('')
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

  const handleChangeFolderTitleValue = useCallback(value => {
    if (folderTitleError) {
      setFolderTitleError('')
    }
    value = value.replaceAll(':', '')
    setFolderTitleValue(value)
    return value
  }, [folderTitleError, setFolderTitleValue])

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
        setFolderTitleError(texts.errorFolderNameEmpty)
        errors = true
      } else if (
        folderNames.includes(folderName.toLowerCase())
      ) {
        setFolderTitleError(texts.errorFolderNameExist)
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
    setFolderTitleError
  ])

  const handleSubmit = useCallback(async () => {
    const isNewCategory = categoryRadioValue === 'new'
    const folderValue = folderTitleValue.trim()
    const categoryValue = ((isNewCategory || isEditCategory) ? categoryNameValue : categorySelectValue).trim()
    const categoryName = normalizeCategoryName(categoryValue, texts)
    const folderName = generateFolderName(folderTitleValue, categoryName)

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
      initialFolder
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
    folderTitleValue,
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
              value={folderTitleValue}
              error={folderTitleError}
              readonly={loading}
              onInput={handleChangeFolderTitleValue}
            />
            <Break size={28} px/>
          </Fragment>
        )}

        <Button
          type="submit"
          loading={loading}
          uppercase
          brand
          outline
        >
          {texts.saveButton}
        </Button>
        <Break size={28} px/>
      </Form>
    </SidebarPopup>
  )
}

const parseParams = (params) => {
  const {
    folder,
    category,
    isInitialFolder,
    isEditFolder,
    isEditCategory
  } = params

  if (isInitialFolder) {
    return {
      initialFolder: {
        title: '',
        category: ''
      },
      initialCategory: '',
      isNewFolder: true,
      isEditFolder: false,
      isEditCategory: false
    }
  }

  return {
    initialFolder: folder,
    initialCategory: category || folder?.category || '',
    isNewFolder: !isEditFolder && !isEditCategory,
    isEditFolder,
    isEditCategory
  }
}
