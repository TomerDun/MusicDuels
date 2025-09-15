# Sequelize + MySQL Cheat Sheet

A clear, VS Code-friendly Markdown reference for writing migrations or models.

---

## 1. Common Data Types

| Sequelize Type             | MySQL Equivalent      | Notes |
|----------------------------|---------------------|-------|
| `Sequelize.STRING`         | `VARCHAR(255)`       | Can specify length: `STRING(100)` |
| `Sequelize.TEXT`           | `TEXT`               | Use `TEXT('long')` for `LONGTEXT` |
| `Sequelize.INTEGER`        | `INT`                | Use `UNSIGNED` if needed |
| `Sequelize.BIGINT`         | `BIGINT`             | For IDs > 2B |
| `Sequelize.FLOAT`          | `FLOAT`              | Use `FLOAT(10,2)` for precision |
| `Sequelize.DOUBLE`         | `DOUBLE`             | Higher precision than float |
| `Sequelize.DECIMAL`        | `DECIMAL`            | Use `DECIMAL(10,2)` for money |
| `Sequelize.DATE`           | `DATETIME`           | Stores timestamps |
| `Sequelize.DATEONLY`       | `DATE`               | Only `YYYY-MM-DD` |
| `Sequelize.BOOLEAN`        | `TINYINT(1)`         | Stores true/false |
| `Sequelize.JSON`           | `JSON`               | MySQL >= 5.7 |
| `Sequelize.UUID`           | `CHAR(36)`           | UUID column |
| `Sequelize.ENUM(...)`      | `ENUM(...)`          | Example: `ENUM('pending','done')` |
| `Sequelize.BLOB`           | `BLOB`               | Binary data |

---

## 2. Column Options

| Option            | Type         | Description |
|------------------|-------------|-------------|
| `allowNull`       | boolean     | Column can or cannot be NULL |
| `primaryKey`      | boolean     | Sets primary key |
| `autoIncrement`   | boolean     | Auto increment for numeric IDs |
| `unique`          | boolean/string | Unique constraint, optionally named |
| `defaultValue`    | any         | Default value if not provided |
| `comment`         | string      | Column comment |
| `validate`        | object      | Built-in validators, e.g., `isEmail` |

---

## 3. Default Values Examples

```js
createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
role: { type: Sequelize.ENUM('admin', 'user', 'guest'), defaultValue: 'user' }
```

---

## 4. Foreign Keys

```js
postId: {
  type: Sequelize.INTEGER,
  references: {
    model: 'Posts', // target table
    key: 'id'       // target column
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
}
```

**onUpdate / onDelete options:** `CASCADE`, `SET NULL`, `RESTRICT`, `NO ACTION`

---

## 5. Indexes

```js
// Add index in migration
await queryInterface.addIndex('Users', ['email'], { unique: true, name: 'users_email_unique' });

// Or directly in createTable
email: { type: Sequelize.STRING, unique: true }
```

---

## 6. Full Migration Example

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      role: { type: Sequelize.ENUM('admin','user','guest'), defaultValue: 'user' },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
      profileId: { type: Sequelize.INTEGER, references: { model: 'Profiles', key: 'id' }, onDelete: 'CASCADE' },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};
```

---

## 7. References

- [Sequelize Data Types](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
- [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
