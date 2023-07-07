import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Tag } from "../App";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useMemo, useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { outlineColor, secondaryColor, textColor } from "../utils/themeColorUtils";

type NoteProps = {
  onDelete: (id: string) => void,
  tags: Tag[],
}

export function Note({ onDelete, tags }:NoteProps ) {
  const { themeColor } = useSelector((state: RootState) => state.settingsData);
  const navigate = useNavigate();
  const note = useNote();

  const themeColorText = textColor(themeColor);
  const themeColorOutline = outlineColor(themeColor);

  const selectedTags = useMemo(() => {
    return tags?.filter(tag => note.tagIDs?.includes(tag.id)) || [];
  }, [tags, note.tagIDs])
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className={`text-${themeColorText}`}>{note.title}</h1>
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
              <Button variant={`outline-${themeColorOutline}`}>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className={`text-${themeColorText}`}>{note.text}</ReactMarkdown>
    </>
  )
}