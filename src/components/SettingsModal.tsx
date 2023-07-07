import { Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setThemeColor, setShowTextMode } from "../redux/settingsSlice";
import { textColor } from "../utils/themeColorUtils";

type SettingsModalProps = {
  show: boolean,
  close: () => void,
  showTextMode: boolean,
  themeColor: string,
}

export function SettingsModal({
  show,
  close,
  showTextMode,
  themeColor,
}: SettingsModalProps) {
  const dispatch = useDispatch();
  const themeColorOptions = [
    'light',
    'dark',
  ]
  const themeColorText = textColor(themeColor);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header className={`bg-${themeColor}`} closeButton>
        <Modal.Title className={`text-${themeColorText}`}>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`py-0 bg-${themeColor}`}>
        <Form>
          <Stack>
            <Row className="border-bottom align-items-center">
              <Col>
                <Form.Label className={`text-${themeColorText}`}>Show Text</Form.Label>
              </Col>
              <Col xs='auto'>
                <Form.Check
                  type="switch"
                  checked={showTextMode}
                  onChange={() => dispatch(setShowTextMode(!showTextMode))}
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col>
                <Form.Label className={`text-${themeColorText}`}>Theme Color</Form.Label>
              </Col>
              <Col xs='auto'>
                <Form.Select
                  className={`border-0 bg-${themeColor} text-${themeColorText}`}
                  defaultValue={themeColor}
                  onChange={option => dispatch(setThemeColor(option.currentTarget.value))}
                >
                  {themeColorOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}