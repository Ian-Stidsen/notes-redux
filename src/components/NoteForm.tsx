import { useRef } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NoteForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  //const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate()


  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  )
}