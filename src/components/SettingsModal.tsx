import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setThemeColor, setShowTextMode } from "../redux/settingsSlice";
import { useEffect, useState } from "react";

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
  
  useEffect(() => {
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemThemePreferences = systemThemeQuery.matches ? 'dark' : 'light';
    
    dispatch(setThemeColor(systemThemePreferences))
  }, []);
  

  const darkModeTextColor = themeColor === 'dark'? 'light' : 'black'
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header className={`bg-${themeColor}`} closeButton>
        <Modal.Title className={`text-${darkModeTextColor}`}>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`py-0 bg-${themeColor}`}>
        <Form>
          <Stack>
            <Row className="border-bottom align-items-center">
              <Col>
                <Form.Label className={`text-${darkModeTextColor}`}>Show Text</Form.Label>
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
                <Form.Label className={`text-${darkModeTextColor}`}>Theme Color</Form.Label>
              </Col>
              <Col xs='auto'>
                <Form.Select
                  className={`border-0 bg-${themeColor} text-${darkModeTextColor}`}
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