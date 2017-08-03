import knexModule from 'knex';
import bookshelfModule from 'bookshelf';
import scriptsService from '../db/services/scripts';
import { development as devconfig } from '../../knexfile';
import Script from '../db/models/scripts';
// import bookshelfCreateTable from '../db/init';

const knex = knexModule(devconfig);
const bookshelf = bookshelfModule(knex);
const ScriptModel = Script(bookshelf);

export function getScriptById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return scriptsService.getScriptById(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(200).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not fetch script by id: ', err);
    });
}

export function updateScriptById(req, res, next) {
  const params = {
    name: req.params.name,
    body: req.params.body,
    description: req.params.description
  };

  return scriptsService.updateScriptById(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(200).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not update script: ', err);
    });
}

export function deleteScriptById(req, res, next) {
  const params = {
    id: req.params.id
  };

  return scriptsService.deleteScriptById(params, ScriptModel)
    .then((script) => {
      if (script) {
        res.status(200).json(script);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('could not delete script', err);
    });
}

export function addQuestionToScript(req, res, next) {
  const { questionId, scriptId } = req.params;
  const params = { questionId, scriptId };
  return scriptsService.addQuestionToScript(params)
    .then((scriptQuestion) => {
      if (scriptQuestion) {
        res.status(200).json(scriptQuestion);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error adding question to script: ', err);
    });
}

export function getQuestionsByScriptId(req, res, next) {
  const { id } = req.params;
  const params = { id };
  return scriptsService.getQuestionsByScriptId(params)
    .then((questions) => {
      if (questions) {
        const { models } = questions;
        // parsing
        res.status(200).json(models);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log('error getting questions by script id: ', err);
    });
}
