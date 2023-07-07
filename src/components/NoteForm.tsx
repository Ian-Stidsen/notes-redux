import { CSSProperties, FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
import { NoteData, Tag } from "../App";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { secondaryColor, textColor } from "../utils/themeColorUtils";
import styles from "./styles/NoteForm.module.css";
import { ControlProps } from "react-select";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags?: Tag[],
} & Partial<NoteData>

type SelectStateType = {
  value: string,
  label: string,
}

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  text = "",
  tagIDs = [],
 }: NoteFormProps) {
  const { themeColor } = useSelector((state: RootState) => state.settingsData);
  const themeColorText = textColor(themeColor);
  const themeColorSecondary = secondaryColor(themeColor)
  const placeHolderColor = themeColor === "light"? styles.placeholderLightTheme : styles.placeholderDarkTheme

  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(() => {
    return availableTags?.filter(tag => tagIDs.includes(tag.id)) || [];
  });

  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const currentTagIDs = selectedTags?.map(tag => tag.id);
    onSubmit(
      {
        title: titleRef.current!.value,
        text: textRef.current!.value,
        tagIDs: currentTagIDs,
      }
    );
    navigate("..");
  }

  const backgroundColorHex = themeColor === 'light'? '#ffffff' : '#6c767c';
  const hoverBackgroundColorHex = themeColor === 'light'? '#efeded' : '#53575a';

  const secondaryColorHex = themeColor === 'light'? '#e5e5e5' : '#ffffff';

  const placeHolderHex = themeColor === 'light'? '#8d8d8d' : '#E6E6E6';
  const textColorHex = themeColor === 'light'? '#000000' : '#ffffff';

  const reactSelectStyles = {
    control: (baseStyles: CSSProperties, state: ControlProps<SelectStateType>) => ({
      ...baseStyles,
      backgroundColor: backgroundColorHex,
      boxShadow: state.isFocused? `blue 0px 0px 10px 0px` : 'none',
      '&:focus': {
        border: '1px'
      }
    }),
    menu: (baseStyles: CSSProperties) => ({
      ...baseStyles,
      backgroundColor: backgroundColorHex,
    }),
    placeholder: (baseStyles: CSSProperties) => ({
      ...baseStyles,
      color: placeHolderHex,
    }),
    input: (baseStyles: CSSProperties) => ({
      ...baseStyles,
      color: textColorHex,
    }),
    option: (baseStyles: CSSProperties, state: ControlProps<SelectStateType>) => ({
      ...baseStyles,
      color: textColorHex,
      backgroundColor: backgroundColorHex,
      '&:hover': {
        backgroundColor: hoverBackgroundColorHex,
      }
    }),
    multiValue: (baseStyles: CSSProperties) => ({
      ...baseStyles,
      backgroundColor: secondaryColorHex,
    }),
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className={`text-${themeColorText}`}>Title</Form.Label>
              <Form.Control
              className={`text-${themeColorText} bg-${themeColorSecondary} ${placeHolderColor}`}
              placeholder="Note title"
              ref={titleRef}
              required
              defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={`text-${themeColorText}`}>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { label, id: uuidv4() };
                  onAddTag(newTag);
                  setSelectedTags(prev => {
                    return [...prev, newTag];
                  })
                }}
                options={availableTags?.map(tag => {
                  return {
                    value: tag.id,
                    label: tag.label,
                  };
                })}
                value={selectedTags?.map(tag => {
                  return {
                    value: tag.id,
                    label: tag.label,
                  };
                })}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => {
                    return {
                      id: tag.value,
                      label: tag.label,
                    };
                  }));
                }}
                placeholder='Select note tags'
                isMulti
                styles={reactSelectStyles}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group controlId="markdown">
          <Form.Label className={`text-${themeColorText}`}>Text</Form.Label>
          <Form.Control
            className={`text-${themeColorText} bg-${themeColorSecondary} ${placeHolderColor}`}
            defaultValue={text}
            required
            as="textarea"
            rows={15}
            ref={textRef}
            placeholder="Note text"/>
        </Form.Group>
      
        <Stack direction="horizontal" gap={4} className="justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>

          <Link to='..'>
            <Button variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}