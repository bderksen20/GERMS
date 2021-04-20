const { Connection, Request } = require("tedious");

// Create connection to database (SQL Query)
const config = {
  authentication: {
    options: {
      userName: "derk", // update me
      password: "D$erver2021" // update me
    },
    type: "default"
  },
  server: "derkserver.database.windows.net", // update me
  options: {
    database: "senior_design_data", //update me
    encrypt: true
  }
};

const connection = new Connection(config);    // init connection w/ above config

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    //console.assert("Connection success!!!\n");
    queryDatabase();
  }
});

function queryDatabase() {
    console.log("Reading rows from the Table...");
  
    // Read all rows from table
    const request = new Request(
      `SELECT TOP 20 pc.Name as CategoryName,
                     p.name as ProductName
       FROM [SalesLT].[ProductCategory] pc
       JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
  
    request.on("row", columns => {
      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });
  
    connection.execSql(request);
  }