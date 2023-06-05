"use client";
import React from 'react';
import { Table } from "@nextui-org/react";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function() {

  const { data, error, isLoading } = useSWR('/report/equity_vol_data', fetcher);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const columns = Object.keys(data[0]);
  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
        fontFamily: "Helvetica",
        fontSize: "16px",
        maxWidth: "20px",
        overflow: "auto"
      }}
    >
      <Table.Header>
        {columns.map((column, index) => (<Table.Column key={index.toString()}> {column} </Table.Column>)) }
      </Table.Header>
      <Table.Body>
        {
          data.map((row, index) => (
            <Table.Row key={index.toString()}>
              {Object.values(row).map((column, index) => (<Table.Cell key={index.toString()}>{column}</Table.Cell>))}
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  );
};