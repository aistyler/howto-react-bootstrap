import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Col,Form, Row } from 'react-bootstrap';

//
// Types
//
interface CommentEditProps {
  editMode: boolean; 
  contents: string;

  onSubmit?: (event: React.MouseEvent<HTMLFormElement>) => void;
  onChangeInputValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFocus?: React.FocusEventHandler<HTMLInputElement>;
}

//
// View component
//

//
// Controller component
//
export function CommentEditor(props: CommentEditProps) {

  return (
    <Form onSubmit={props.onSubmit} style={{width: '100%', height: '100%'}}>
      <Row style={{width: '100%', height: '100%'}}>
        <Col sm={10}>
            <Form.Control 
              name={'comments'} 
              onChange={props.onChangeInputValue} 
              value={props.contents} 
              as="textarea" 
              onBlur={props.onChangeFocus} 
              autoFocus
              rows={4}/>
        </Col>
        <Col sm={1}>
          <Button type='submit' hidden={!props.editMode} className="btn-primary">{'Post'}</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default CommentEditor;
