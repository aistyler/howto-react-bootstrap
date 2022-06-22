import React, { HTMLProps } from 'react';
import { GetUniPostsByIdApiResponse } from '@howto/rtk-rest-api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Row } from 'react-bootstrap';
import { CommentEditor } from './comment-editor';
//
// Types
//
type CommentBoxStatus = { 
  isEditMode: boolean; comments: string;
};

interface CommentBoxProps extends HTMLProps<HTMLDivElement> {
  item:  GetUniPostsByIdApiResponse['data'];
  onDeleteItem: React.MouseEventHandler<HTMLElement>;
  onUpdateItem: (id: number, contents: string) => void;
  isEditMode?: boolean;
}

//
// View component
//

//
// Controller component
//
export function CommentBox({
  item,
  isEditMode,
  onDeleteItem,
  onUpdateItem,
  ...rest
}: CommentBoxProps) {

  const [editMode, setEditMode] = React.useState(isEditMode ?? false);
  const [contents, setContents] = React.useState((item && item.attributes?.content) || '');

  if (editMode) {
    return <CommentEditor 
      editMode={editMode} 
      contents={contents}
      onChangeFocus={onChangeFocusEditor}
      onChangeInputValue={onChangeInputValue}
      onSubmit={onSubmitEditor}
    />;
  }

  return (
    <div className="card" {...rest}>
      <div className="card-header">
        <Row>
          <Col sm={11}>
            {item?.attributes?.user?.data?.attributes?.username}
            <small>{' commented on '}{item?.attributes?.updatedAt}</small>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id={`${item?.id}dropdown`}  variant='primary-outline'/>
              <Dropdown.Menu>
                <Dropdown.Item as='button' name={`edit:${item?.id}`} onClick={onClickEdit}>Edit</Dropdown.Item>
                <Dropdown.Item as='button' name={`del:${item?.id}`} onClick={(e) => onDeleteItem(e)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div className="card-body">
        <blockquote className="blockquote">
          <p>{item?.attributes?.content}</p>
          <footer className="blockquote-footer">{`${item?.id}`}</footer>
        </blockquote>
      </div>
    </div>
  );

  function onClickEdit(event: React.MouseEvent<HTMLButtonElement>) {
    setEditMode(true);
  }

  function onChangeFocusEditor(event: React.FocusEvent<HTMLInputElement>) {
    if (item && item.attributes?.content) {
      if (item.attributes?.content === contents) {
        setEditMode(false);
      }
    }
  }

  function onChangeInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    setContents(event.currentTarget.value);
  }

  function onSubmitEditor(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    onUpdateItem(item?.id as number, contents);
    setEditMode(false);
  }
}

export default CommentBox;
