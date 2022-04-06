import { Fragment, h } from 'preact'
import type { FunctionComponent as FC } from 'preact'
import { memo } from 'preact/compat'
import { useCallback, useMemo, useState } from 'preact/hooks'

import { createFolder, editFolder, editGroup, editCategory } from '~/core/actions'
import { useTexts, useFolders, useFoldersParams } from '~/core/hooks'
import { generateFolderName, normalizeCategoryName } from '~/tools/handle-content'
import { SidebarPopup } from '~/ui/elements/sidebar-popup'
import { Form } from '~/ui/elements/form'
import { Select } from '~/ui/elements/select'
import { Input } from '~/ui/elements/input'
import { Button } from '~/ui/elements/button'
import { Switch } from '~/ui/elements/switch'
import { Break } from '~/ui/elements/break'

import type { FoldersFormPopupParams } from './storage'

type Props = {
  params: FoldersFormPopupParams
  onClose: () => void
}

const EMPTY_SELECT_VALUE = 'empty'
const NEW_SELECT_VALUE = 'new'

export const StorageSidebarFoldersFormPopup: FC<Props> = memo(({
  params,
  onClose
}) => {
  const {
    initialFolder, initialGroup, initialCategory, isNewFolder, isEditFolder, isEditGroup, isEditCategory
  } = parseParams(params)
  const { texts } = useTexts('storage')
  const { folders } = useFolders()
  const { groups, categories } = useFoldersParams(folders)
  const [categorySelectValue, setCategorySelectValue] = useState(initialFolder?.category || (initialCategory ?? EMPTY_SELECT_VALUE))
  const [categoryNameValue, setCategoryNameValue] = useState(isEditCategory ? (initialCategory || '') : '')
  const [isGroup, setIsGroup] = useState(!!initialFolder?.group || !!initialGroup)
  const [groupSelectValue, setGroupSelectValue] = useState(initialFolder?.group || (initialGroup ?? EMPTY_SELECT_VALUE))
  const [groupNameValue, setGroupNameValue] = useState(isEditGroup ? (initialGroup || '') : '')
  const [folderTitleValue, setFolderTitleValue] = useState(initialFolder?.title || '')
  const [categorySelectError, setCategorySelectError] = useState('')
  const [categoryNameError, setCategoryNameError] = useState('')
  const [groupSelectError, setGroupSelectError] = useState('')
  const [groupNameError, setGroupNameError] = useState('')
  const [folderTitleError, setFolderTitleError] = useState('')
  const [loading, setLoading] = useState(false)

  const categoryOptions = useMemo(() => [
    { text: '', value: EMPTY_SELECT_VALUE },
    { text: texts.categoryCreateButton, value: NEW_SELECT_VALUE, button: true },
    ...categories.map(category => ({
      text: category || texts.generalCategoryTitle,
      value: category
    }))
  ], [categories, texts.categoryCreateButton, texts.generalCategoryTitle])

  const groupOptions = useMemo(() => {
    const options = [
      { text: '', value: EMPTY_SELECT_VALUE },
      { text: texts.groupCreateButton, value: NEW_SELECT_VALUE, button: true },
      ...(groups[categorySelectValue] || []).map(group => ({
        text: group,
        value: group
      }))
    ]
    if (options.some(({ value }) => value !== groupSelectValue)) {
      options.push({ text: groupSelectValue, value: groupSelectValue })
    }
    return options
  }, [categorySelectValue, groupSelectValue, groups, texts.groupCreateButton])

  const folderNames = useMemo(() => folders.map(({ title, group, category }) =>
    generateFolderName(title, group, category).toLowerCase()
  ), [folders])

  const handleChangeCategorySelectValue = useCallback(value => {
    if (categorySelectError) {
      setCategorySelectError('')
    }
    setCategorySelectValue(value)
  }, [categorySelectError, setCategorySelectValue])

  const handleChangeCategoryNameValue = useCallback(value => {
    if (categoryNameError) {
      setCategoryNameError('')
    }
    value = value.replaceAll(':', '')
    setCategoryNameValue(value)
    return value
  }, [categoryNameError, setCategoryNameValue])

  const handleChangeIsGroup = useCallback(value => {
    setIsGroup(value)
  }, [setIsGroup])

  const handleChangeGroupSelectValue = useCallback(value => {
    if (groupSelectError) {
      setGroupSelectError('')
    }
    setGroupSelectValue(value)
  }, [setGroupSelectValue])

  const handleChangeGroupNameValue = useCallback(value => {
    if (groupNameError) {
      setGroupNameError('')
    }
    value = value.replaceAll(':', '')
    setGroupNameValue(value)
    return value
  }, [groupNameError, setGroupNameValue])

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
    groupValue,
    groupName,
    isNewGroup,
    categoryValue,
    categoryName,
    isNewCategory
  }) => {
    let errors = false

    if (isNewFolder || isEditFolder) {
      if (categoryValue === EMPTY_SELECT_VALUE) {
        setCategorySelectError(texts.errorCategorySelectEmpty)
        errors = true
      }

      if (isGroup && groupValue === EMPTY_SELECT_VALUE) {
        setGroupSelectError(texts.errorGroupSelectEmpty)
        errors = true
      }

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

    if (isNewGroup || isEditGroup) {
      if (!groupValue) {
        setGroupNameError(texts.errorGroupNameEmpty)
        errors = true
      } else if (checkIncludes(groups[categoryValue], groupName)) {
        setGroupNameError(texts.errorGroupNameExist)
        errors = true
      }
    }

    if (isNewCategory || isEditCategory) {
      if (!categoryValue) {
        setCategoryNameError(texts.errorCategoryNameEmpty)
        errors = true
      } else if (checkIncludes(categories, categoryName)) {
        setCategoryNameError(texts.errorCategoryNameExist)
        errors = true
      }
    }

    return errors
  }, [
    categories,
    groups,
    folderNames,
    isEditCategory,
    isEditGroup,
    isEditFolder,
    isNewFolder,
    isGroup,
    texts.errorFolderNameEmpty,
    texts.errorFolderNameExist,
    texts.errorCategoryNameEmpty,
    texts.errorCategoryNameExist,
    setCategoryNameError,
    setFolderTitleError
  ])

  const handleSubmit = useCallback(async () => {
    const isNewCategory = categorySelectValue === NEW_SELECT_VALUE
    const isNewGroup = groupSelectValue === NEW_SELECT_VALUE
    const categoryValue = ((isNewCategory || isEditCategory) ? categoryNameValue : categorySelectValue).trim()
    const categoryName = normalizeCategoryName(categoryValue, texts)
    const groupValue = ((isNewGroup || isEditGroup) ? groupNameValue : groupSelectValue).trim()
    const groupName = isGroup ? groupValue : ''
    const folderValue = folderTitleValue.trim()
    const folderName = generateFolderName(folderValue, groupName, categoryName)

    const errors = validate({
      categoryValue, categoryName, isNewCategory,
      groupValue, groupName, isNewGroup,
      folderValue, folderName
    })
    if (errors) return

    setLoading(true)
    const success = isNewFolder ? await createFolder(
      folderName
    ).catch(() => {
      //todo
    }) : (isEditFolder && typeof params === 'object') ? await editFolder(
      folderName,
      initialFolder
    ) : isEditCategory ? await editCategory(
      categoryName,
      initialCategory
    ) : isEditGroup ? await editGroup(
      groupName,
      initialGroup,
      initialCategory
    ) : null

    if (success) {
      onClose()
    }
  }, [
    params,
    initialFolder,
    initialGroup,
    initialCategory,
    categorySelectValue,
    categoryNameValue,
    groupSelectValue,
    groupNameValue,
    folderTitleValue,
    isEditFolder,
    isNewFolder,
    isGroup,
    isEditGroup,
    isEditCategory,
    texts,
    validate,
    onClose
  ])

  return (
    <SidebarPopup
      title={
        isNewFolder ? texts.folderNewTitle :
          isEditFolder ? texts.folderEditTitle :
            isEditGroup ? texts.groupEditTitle :
              isEditCategory ? texts.categoryEditTitle :
                ''
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
            <Select
              name={texts.categoryLabel}
              label={texts.categoryLabel}
              value={categorySelectValue}
              error={categorySelectError}
              options={categoryOptions}
              disabled={loading}
              onSelect={handleChangeCategorySelectValue}
            />
            <Break size={28} px/>
          </Fragment>
        )}

        {(categorySelectValue === NEW_SELECT_VALUE || isEditCategory) && (
          <Fragment>
            <Input
              name={texts.categoryNameLabel}
              label={texts.categoryNameLabel}
              value={categoryNameValue}
              error={categoryNameError}
              readonly={loading}
              onInput={handleChangeCategoryNameValue}
            />
            <Break size={28} px/>
          </Fragment>
        )}

        {isEditGroup && (
          <Fragment>
            <Input
              name={texts.groupNameLabel}
              label={texts.groupNameLabel}
              value={groupNameValue}
              error={groupNameError}
              readonly={loading}
              onInput={handleChangeGroupNameValue}
            />
            <Break size={28} px/>
          </Fragment>
        )}

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

            <Switch
              text={texts.groupSwitchLabel}
              active={isGroup}
              onChange={handleChangeIsGroup}
            />
            <Break size={28} px/>

            {isGroup && (
              <Fragment>
                <Select
                  name={texts.groupLabel}
                  label={texts.groupLabel}
                  value={groupSelectValue}
                  error={groupSelectError}
                  options={groupOptions}
                  disabled={loading}
                  onSelect={handleChangeGroupSelectValue}
                />
                <Break size={28} px/>

                {(groupSelectValue === NEW_SELECT_VALUE) && (
                  <Fragment>
                    <Input
                      name={texts.groupNameLabel}
                      label={texts.groupNameLabel}
                      value={groupNameValue}
                      error={groupNameError}
                      readonly={loading}
                      onInput={handleChangeGroupNameValue}
                    />
                    <Break size={28} px/>
                  </Fragment>
                )}
              </Fragment>
            )}
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
})

const parseParams = (params) => {
  const {
    folder,
    group,
    category,
    isInitialFolder,
    isEditFolder,
    isEditGroup,
    isEditCategory
  } = params

  if (isInitialFolder) {
    return {
      initialFolder: {
        title: '',
        group: undefined,
        category: undefined
      },
      initialGroup: undefined,
      initialCategory: undefined,
      isNewFolder: true,
      isEditFolder: false,
      isEditGroup: false,
      isEditCategory: false
    }
  }

  return {
    initialFolder: folder,
    initialGroup: group || folder?.group || '',
    initialCategory: category || folder?.category || '',
    isNewFolder: !isEditFolder && !isEditGroup && !isEditCategory,
    isEditFolder,
    isEditGroup,
    isEditCategory
  }
}

const checkIncludes = (values: string[], value: string) =>
  values?.map(value => value?.toLowerCase()).includes(value?.toLowerCase())
