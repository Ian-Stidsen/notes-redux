import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Note } from "../App";
import { useMemo, useState } from "react";

type NoteListProps = {
  notes: Note[],
  tags: Tag[]
}

type SimplifiedNote = {
  id: string,
  title: string,
  tags: Tag[],
}

export function NoteList({ notes, tags }: NoteListProps) {
   const [titleSearch, setTitleSearch] = useState<string>("");
   const [tagSearch, setTagSearch] = useState<Tag[]>([]);
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (titleSearch === '' ||
        note.title.toLowerCase().includes(titleSearch.toLowerCase())) && 
        (tagSearch.length === 0 ||
          tagSearch.every(tag => (
            note.tagIDs?.some(noteID => noteID === tag.id)
          ))
        )
        
    });
  }, [titleSearch, tagSearch, notes]);

  return (
    <>
      <Row>
        <Col><h1>Notes</h1></Col>
        <Col>
          <Stack gap={2} direction="horizontal">
            <Link to='/create'>
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search By Title"
                value={titleSearch}
                onChange={e => setTitleSearch(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              tags={tags.filter(tag => note.tagIDs?.includes(tag.id))}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}

function NoteCard({ id, title, tags}: SimplifiedNote) {
  return (
    <Card as={Link} to={`/${id}`} className="h-100 text-reset text-decoration-none">
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal">
              {tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}