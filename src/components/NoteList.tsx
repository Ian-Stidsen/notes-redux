import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Note } from "../App";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";

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
      <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
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
              <Form.Control
                type="text"
                placeholder="Search By Title"
                value={titleSearch}
                onChange={e => setTitleSearch(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
            <ReactSelect
              placeholder='Search By Tag'
              value={tagSearch.map(tag => ({ value: tag.id, label: tag.label }))}
              options={tags.map(tag => ({ value: tag.id, label: tag.label }))}
              onChange={tags => {
                setTagSearch(tags.map(tag => {
                  return { id: tag.value, label: tag.label }
                }))
              }}
              isMulti
            />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="mt-2">
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