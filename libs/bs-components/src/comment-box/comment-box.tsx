import React, { HTMLProps } from 'react';
import { GetUniPostsByIdApiResponse } from '@yac/hydro-rest-api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Row } from 'react-bootstrap';

//
// Types
//

interface CommentBoxProps extends HTMLProps<HTMLDivElement> {
  item:  GetUniPostsByIdApiResponse['data'];
  onClickMenuItem: React.MouseEventHandler<HTMLElement>;
}

//
// View component
//


//
// Controller component
//
export function CommentBox({
  item,
  onClickMenuItem,
  ...rest
}: CommentBoxProps) {

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
                <Dropdown.Item as='button' name={`edit:${item?.id}`} onClick={onClickMenuItem}>Edit</Dropdown.Item>
                <Dropdown.Item as='button' name={`del:${item?.id}`} onClick={onClickMenuItem}>Delete</Dropdown.Item>
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
}

export default CommentBox;
