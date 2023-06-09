import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Note } from "../App";
import { CSSProperties, useMemo, useState } from "react";
import ReactSelect, { ControlProps, StylesConfig, GroupBase } from "react-select";
import styles from "./styles/NoteList.module.css";
import { v4 as uuidv4 } from "uuid";
import { SettingsModal } from "./SettingsModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { outlineColor, secondaryColor, textColor } from "../utils/themeColorUtils";

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
}

type EditTagsModalProps = {
  show: boolean,
  close: () => void,
  availableTags: Tag[],
  onAddTag: ({ id, label}: Tag) => void,
  onDeleteTag: (id: string) => void,
  onUpdateTag: (id: string, label: string) => void,
  themeColor: string,
}

type SelectStateType = {
  value: string,
  label: string,
}

export function NoteList({ notes, tags, onAddTag, onDeleteTag, onUpdateTag }: NoteListProps) {
  const { themeColor, showTextMode } = useSelector((state: RootState) => state.settingsData);
  
  const themeColorSecondary = secondaryColor(themeColor)
  const themeColorText = textColor(themeColor)
  const themeColorOutline = outlineColor(themeColor)
  const placeHolderColor = themeColor === "light"? styles.placeholderLightTheme : styles.placeholderDarkTheme

  const [titleSearch, setTitleSearch] = useState<string>("");
  const [tagSearch, setTagSearch] = useState<Tag[]>([]);
  const [editTagsMode, setEditTagsMode] = useState<boolean>(false);
  const [settingsMode, setSettingsMode] = useState<boolean>(false);


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

  const backgroundColorHex = themeColor === 'light'? '#ffffff' : '#6c767c';
  const hoverBackgroundColorHex = themeColor === 'light'? '#efeded' : '#53575a';

  const secondaryColorHex = themeColor === 'light'? '#e5e5e5' : '#ffffff';

  const placeHolderHex = themeColor === 'light'? '#8d8d8d' : '#E6E6E6';
  const textColorHex = themeColor === 'light'? '#000000' : '#ffffff';

  const reactSelectStyles: StylesConfig<SelectStateType, true, GroupBase<SelectStateType>> = {
    control: (baseStyles: CSSProperties, state: ControlProps<SelectStateType>) => ({
      ...baseStyles,
      backgroundColor: backgroundColorHex,
      outline: state.isFocused? '#143973 4px solid' : 'none',
      border: '#dfe2e8 1px solid',
      '&:hover': {
        backgroundColor: backgroundColorHex
      },
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
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <Button variant={`outline-${themeColorOutline}`} onClick={() => setSettingsMode(!settingsMode)}>Settings</Button>
        </Col>
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction="horizontal">
            <Link to='/create'>
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant={`outline-${themeColorOutline}`} onClick={() => setEditTagsMode(true)}>Edit Tags</Button>
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
                className={`bg-${themeColorSecondary} text-${themeColorText} ${placeHolderColor}`}
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
              //styles={reactSelectStyles}
              /* className={`react-select-${themeColor}__container`}
              classNamePrefix={`react-select-${themeColor}`} */
              styles={reactSelectStyles}
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
        themeColor={themeColor}
      />
      <SettingsModal
        show={settingsMode}
        close={() => setSettingsMode(false)}
        showTextMode={showTextMode}
        themeColor={themeColor}
      />
    </>
  )
}

function NoteCard({ id, title, tags, text }: NoteCardProps) {
  const { themeColor, showTextMode } = useSelector((state: RootState) => state.settingsData);

  if (text){
    const maxTextLength = 150;
    const ellipsis = text.length > maxTextLength? "..." : '';
    const truncatedText = text.slice(0, maxTextLength) + ellipsis;
    text = truncatedText;
  }

  const themeColorSecondary = secondaryColor(themeColor)
  const themeColorText = textColor(themeColor)

  const cardClassName = themeColor === 'light'? styles.card : styles.cardDark;

  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${cardClassName} bg-${themeColorSecondary} `}>
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-top h-100">
          <span className={`fs-5 text-${themeColorText}`}>{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center">
              {tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
          {showTextMode && (
            <p className={`text-center text-${themeColorText}`}>{text}</p>
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
  themeColor
}: EditTagsModalProps) {
  const themeColorText = textColor(themeColor);
  const themeColorSecondary = secondaryColor(themeColor);
  const themeColorOutline = outlineColor(themeColor);
  const placeHolderColor = themeColor === "light"? styles.placeholderLightTheme : styles.placeholderDarkTheme;

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header className={`bg-${themeColor}`} closeButton>
        <Modal.Title className={`text-${themeColorText}`}>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`bg-${themeColor}`}>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                    className={`bg-${themeColorSecondary} text-${themeColorText} ${placeHolderColor}`}
                    placeholder="Tag Label"
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
              <Button variant={`outline-${themeColorOutline}`}
                onClick={() => onAddTag({id: uuidv4(), label: 'New Tag'})}>
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