import * as Knex from 'knex';

export class SectionDao {

  session: Knex;

  constructor(session: Knex) {
    this.session = session;
  }
}
