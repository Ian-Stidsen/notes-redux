import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Note } from "../App";
import { useEffect, useMemo, useState } from "react";
import ReactSelect from "react-select";
import styles from "./styles/NoteList.module.css";
import { v4 as uuidv4 } from "uuid";

type NoteListProps = {
  notes: Note[],
  tags: Tag[],
  onAddTag: ({ id, label}: Tag) => void,
  onDeleteTag: (id: string) => void,
  onUpdateTag: (id: string, label: string) => void,
}

type NoteCardProps = {
  id: string,
  title: string,
  tags: Tag[],
  text: string | undefined,
  showText: boolean,
}

type EditTagsModalProps = {
  show: boolean,
  close: () => void,
  availableTags: Tag[],
  onAddTag: ({ id, label}: Tag) => void,
  onDeleteTag: (id: string) => void,
  onUpdateTag: (id: string, label: string) => void,
}

export function NoteList({ notes, tags, onAddTag, onDeleteTag, onUpdateTag }: NoteListProps) {
  const [titleSearch, setTitleSearch] = useState<string>("");
  const [tagSearch, setTagSearch] = useState<Tag[]>([]);
  const [editTagsMode, setEditTagsMode] = useState<boolean>(false);
  
  const [showTextMode, setShowTextMode] = useState<boolean>(
    localStorage.getItem("showTextMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("showTextMode", String(showTextMode));
  }, [showTextMode]);

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

  function handleShowTextToggle() {
    setShowTextMode(!showTextMode);
  }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <Form.Group>
            <Form.Check
              type="switch"
              label="Show Text"
              checked={showTextMode}
              onChange={handleShowTextToggle}
            />
          </Form.Group>
        </Col>
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction="horizontal">
            <Link to='/create'>
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() => setEditTagsMode(true)}>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
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
      <Row xs={1} sm={2} lg={3} xl={4} xxl={5} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              tags={tags.filter(tag => note.tagIDs?.includes(tag.id))}
              text={note.text}
              showText={showTextMode}
            />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={editTagsMode}
        close={() => setEditTagsMode(false)}
        availableTags={tags}
        onAddTag={onAddTag}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </>
  )
}

function NoteCard({ id, title, tags, text, showText}: NoteCardProps) {
  if (text){
    const maxTextLength = 150;
    const ellipsis = text.length > maxTextLength? "..." : '';
    const truncatedText = text.slice(0, maxTextLength) + ellipsis;
    text = truncatedText;
  }
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-top h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center">
              {tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
          {showText && (
            <p className="text-center">{text}</p>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({
  show,
  close,
  availableTags,
  onAddTag,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
            <Row className="justify-content-center">
              <Col xs='auto'>
              <Button variant="outline-secondary"
                onClick={() => onAddTag({id: uuidv4(), label: ''})}>
                Add Tag 
              </Button>
              </Col>
            </Row>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}