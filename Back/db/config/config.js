const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "use_env_variable": "DATABASE_URL",
        "dialect": "postgres",
        // Cloud PostgreSQL (SSL required)
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    },
    "test": {
        "use_env_variable": "DATABASE_URL",
        "dialect": "postgres",
        // Cloud PostgreSQL (SSL required)
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    },
    "production": {
        "use_env_variable": "DATABASE_URL", 
        "dialect": "postgres",
        // Cloud PostgreSQL (SSL required)
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
}