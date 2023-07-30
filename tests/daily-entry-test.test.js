//Path: backend\tests\weekly-entry-test.test.js

const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');