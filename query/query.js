const config = require("../config/config");

const mySql = config.mysqlConfig;

class Query {


  async pgGet(query, values) {
    console.log('signUpCustomer pgGet');
    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {

        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: err
          })
        } else {
          resolve(res);
        }
      });
    });
  }

  async post(query, values) {

    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {
        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: 'Record not Inserted.',
            data: err,
            isRegistered: false
          })
        } else {
          resolve({
            statusCode: 201,
            message: "Record has been Inserted successfully.",
            data: res,
            isRegistered: true
          });
        }
      });
    });
  }

  async update(query, values) {
    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {

        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: 'Record not updated.',
            data: err,
            isUpdated: false
          })
        } else {
          resolve({
            statusCode: 201,
            message: "Updated successfully!",
            data: res,
            isUpdated: true
          });
        }
      });
    });
  }

  async delete(query, values) {

    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {

        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: 'Record not deleted.',
            data: err,
            isDeleted: false
          })
        } else {
          resolve({
            statusCode: 201,
            message: "Record has been deleted successfully.",
            data: res,
            isDeleted: true
          });
        }
      });
    });
  }


  async get(query, values) {

    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {
console.log("RES",res);
        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: 'Record not found.',
            data: err,
            isFound: false
          })
        } else {
          if (res.length === 0) {
            resolve({
              statusCode: 200,
              message: "Record not found.",
              data: res,
              isFound: false
            });
          } else {
            delete res[0].password;
            resolve({
              statusCode: 201,
              message: "Record found successfully.",
              data: res[0],
              isFound: true
            });
          }
        }
      });
    });
  }

  async productGet(query, values) {
    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {

        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: 'Record not found.',
            data: err,
            isFound: false
          })
        } else {
          if (res.length === 0) {
            resolve({
              statusCode: 201,
              message: "Record not found.",
              data: res,
              isFound: false
            });
          } else {
            resolve({
              statusCode: 201,
              message: "Record found successfully.",
              data: res,
              isFound: true
            });
          }
        }
      });
    });
  }

  async getAll(query, values) {
    console.log("query is", query);
    console.log("value is", values);
    return await new Promise((resolve, reject) => {
      mySql.query(query, values, async (err, res) => {
        console.log("value is res", res,err);
        //await pgSql.end();
        if (err) {
          reject({
            statusCode: 400,
            message: 'Record not found.',
            data: err,
            isFound: false
          })
        } else {
          if (res.length === 0) {
            resolve({
              statusCode: 201,
              message: "Record not found.",
              data: res,
              isFound: true
            });
          } else {
            resolve({
              statusCode: 201,
              message: "Record found successfully.",
              data: res,
              isFound: true
            });
          }
        }
      });
    });
  }

}

module.exports = new Query();
