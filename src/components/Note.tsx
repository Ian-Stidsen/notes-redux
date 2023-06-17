import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Tag } from "../App";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useMemo, useState } from "react";

type NoteProps = {
  onDelete: (id: string) => void,
  tags: Tag[],
}

export function Note({ onDelete, tags }:NoteProps ) {
  const navigate = useNavigate();
  const note = useNote();
 /*  const [selectedTags, setSelectedTags] = useState([]);
  const selectedTags = tags?.filter(tag => note.id.includes(tag.id)); */
  /* const [selectedTags, setSelectedTags] = useState<Tag[]>(() => {
    return tags?.filter(tag => note.id.includes(tag.id)) || [];
  }); */
  const selectedTags = useMemo(() => {
    return tags?.filter(tag => note.tagIDs?.includes(tag.id)) || [];
  }, [tags, note.tagIDs])
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          <Stack gap={1} direction="horizontal" className="flex-wrap">
            {selectedTags.map(tag => (
              <Badge key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
        <Col xs='auto'>
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => {
              onDelete(note.id)
              navigate("/")
              }}>Delete</Button>
            <Link to='/'>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.text}</ReactMarkdown>
    </>
  )
}