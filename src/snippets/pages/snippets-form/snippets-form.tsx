import {Form, Input, Label, TextArea} from "../../../shared/components/forms/forms.tsx";
import {ButtonsWrapper, CancelButton, OkButton} from "../../../shared/components/forms/buttons.tsx";
import {useNavigate, useParams} from "react-router-dom";
import useSnippetsStore from "../../snippets-store.ts";
import Snippet from "../../models/snippet.ts";
import {useToast} from "../../../toast/toast-provider.tsx";
import {MessageType} from "../../../toast/models/message.ts";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function SnippetsForm() {
  const { id } = useParams<{ id: string }>()
  const snippet = useSnippetsStore(state =>
    state.snippets.find(s => s.id === id))
  const [title, setTitle] = useState(snippet?.title ?? "")
  const [content, setContent] = useState(snippet?.content ?? "")
  const navigate = useNavigate()
  const addSnippetToStore = useSnippetsStore(state => state.addSnippet)
  const updateSnippetToStore = useSnippetsStore(state => state.updateSnippet)
  const { showToast } = useToast()
  const { t } = useTranslation()

  const addOrUpdateSnippetClick = () => {
    if (snippet) {
      const updated = { ...snippet, title, content };
      console.log(updated)
      updateSnippetToStore(updated);
      showToast(t('snippet updated'), MessageType.Success);
    } else {
      addSnippetToStore(new Snippet(title, content));
      showToast(t('snippet created'), MessageType.Success);
    }
    navigate("/")
  }

  return (
    <Form>
      <Label>{t('title label')}</Label>
      <Input value={title} onChange={setTitle} placeholder={ t('title placeholder') } />
      <Label>{t('content label')}</Label>
      <TextArea value={content} onChange={setContent}  placeholder={ t('content placeholder') }></TextArea>
      <ButtonsWrapper>
        <CancelButton onClick={() => navigate("/")} />
        <OkButton onClick={() => addOrUpdateSnippetClick()} />
      </ButtonsWrapper>
    </Form>
  )
}