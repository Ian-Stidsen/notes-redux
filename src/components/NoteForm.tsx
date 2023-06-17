import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void,
  onAddTag: (tag: Tag) => void,
  availableTags?: Tag[],
} & Partial<NoteData>

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  text = "",
  tagIDs = [],
 }: NoteFormProps) {

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

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="Note title" ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
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
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group controlId="markdown">
          <Form.Label>Text</Form.Label>
          <Form.Control defaultValue={text} required as="textarea" rows={15} ref={textRef} placeholder="Note text"/>
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