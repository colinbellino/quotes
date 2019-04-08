import React from "react";

export const AdminPage = ({ path }) => (
  <div>
    <h1>Admin</h1>
    <form name="add-quote" method="post">
      <input type="hidden" name="form-name" value="add-quote" />
      <p>
        <label>
          Author:{" "}
          <select name="author">
            <option value="Cédric">Cédric</option>
            <option value="Colin">Colin</option>
            <option value="David">David</option>
            <option value="Julie">Julie</option>
            <option value="Julien">Julien</option>
            <option value="Rudy">Rudy</option>
            <option value="Valérie">Valérie</option>
            <option value="Wolfgang">Wolfgang</option>
            <option value="Thaïs">Thaïs</option>
            <option value="Marwen">Marwen</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Text: <br />
          <textarea rows={5} cols={32} name="text" />
        </label>
      </p>
      <p>
        <label>
          Date:{" "}
          <input
            type="text"
            name="date"
            defaultValue={new Date().toISOString()}
          />
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </div>
);
