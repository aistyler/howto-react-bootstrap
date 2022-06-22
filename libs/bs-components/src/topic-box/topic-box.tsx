import React, { HTMLProps } from 'react';
import { GetUniPostsByIdApiResponse } from '@howto/rtk-rest-api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Col, Row } from 'react-bootstrap';

//
// Types
//

interface TopicBoxProps extends HTMLProps<HTMLDivElement> {
  item:  GetUniPostsByIdApiResponse['data'];
  onClickMenuItem: React.MouseEventHandler<HTMLElement>;
}

//
// View component
//

//
// Controller component
//
export function TopicBox({
  item,
  onClickMenuItem,
  ...rest
}: TopicBoxProps) {

  return (
    <div className="card" {...rest}>
      <div className="card-header">
        <Row>
          <Col sm={11}>
            {item?.attributes?.user?.data?.attributes?.username || 'Anonymous'}
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id={`${item?.id}dropdown`}  variant='primary-outline'/>
              <Dropdown.Menu>
                <Dropdown.Item as='button' name={`edit:${item?.id}`} onClick={(e) => onClickMenuItem(e)}>Edit</Dropdown.Item>
                <Dropdown.Item as='button' name={`del:${item?.id}`} onClick={(e) => onClickMenuItem(e)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div className="card-body">
        <blockquote className="blockquote">
          <p>{item?.attributes?.title}</p>
          <footer className="blockquote-footer">{`${item?.id}`}</footer>
        </blockquote>
      </div>
      <div className="card-footer text-muted">
        {' written at '}{item?.attributes?.updatedAt}
      </div>
    </div>
  );
}

export default TopicBox;
