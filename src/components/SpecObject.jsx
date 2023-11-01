import React from "react";

export default function SpecObject() {
  let date = new Date();
  let currectDay = date.toLocaleDateString();
  return (
    <>
      <div>
        <p>{currectDay}</p>
        <div
          style={{
            width: "90%",
            height: "15vh",
            border: "1px solid orange",
            backgroundColor: "darkblue",
            color: "white",
          }}
        >
          <h2 className="white">TITLE</h2>
          <h5 className="white">TEXT</h5>

          <select class="form-select" aria-label="Default select example">
            <option selected>Work status:</option>
            <option value="In-progress">In progress</option>
            <option value="Done">Done</option>
          </select>

          <select class="form-select" aria-label="Default select example">
            <option selected>Can I work?</option>
            <option value="In-progress">Edit</option>
            <option value="Done">Done</option>
          </select>

          <button type="reset">delete</button>
        </div>
      </div>
    </>
  );
}
