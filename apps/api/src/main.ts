import { Server, IncomingMessage, ServerResponse } from 'http';

import * as fxl from '@01group/fxl';
import fastify, { FastifyInstance } from 'fastify';

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify();

interface Cost {
  item: string;
  cost: number;
}

function toRecord(cost: Cost): Record<string, fxl.Value> {
  return { ...cost };
}

function createCells(costs: Cost[]) {
  const headerStyle = fxl.compose(
    fxl.setBold(true),
    fxl.setSolidFg('black'),
    fxl.setFontColor('white')
  );
  const headerCells = fxl.rowToCells(['Item', 'Cost']).map(headerStyle);

  const bodyStyle = fxl.applyIf(
    (x) => x.coord.col == 0,
    fxl.setSolidFg('light_gray')
  );
  const records = costs.map(toRecord);
  const bodyCells = fxl
    .recordsToCells(['item', 'cost'], records)
    .map(bodyStyle);

  const total = costs.map((x) => x.cost).reduce((x, y) => x + y);
  const totalCells = fxl.rowToCells(['Total', total]).map(headerStyle);

  const allStyle = fxl.setHorizontalAlignement('center');
  return fxl.concatBelow(headerCells, bodyCells, totalCells).map(allStyle);
}

server.post<{ Body: Cost[] }>('/excel', async (request, reply) => {
  const cells = createCells(request.body);
  const buffer = await fxl.writeBinary(cells);
  console.log(cells);
  if (buffer.ok) {
    reply.code(200).send(buffer.val);
  } else {
    reply.code(500).send(buffer.val);
  }
});

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }
  console.log(`Server listening at ${address}`);
});
