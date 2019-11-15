import React, { useState } from "react";
import {TextField, Button, ButtonGroup, Container} from "@material-ui/core";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    // The color that is being edited, we want to get the empty structure from initialColor, so we set the colorToEdit and put that to our URL
    AxiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        // We run another Axios call so then we get the newly updated list of colors which will dynamically update the bubbles page
        AxiosWithAuth().get('/api/colors').then(response => updateColors(response.data)).catch(error => console.log(error));
        console.log(response);
      })
      .catch(error => console.log(error))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    AxiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(response => {
        // pass in the updateColors call back so that it will filter based upon the ID that was not selected. Essentially deletes the item immediately, but then refactors the page without that ID
        updateColors(() => colors.filter(item => item.id !== color.id));
    })
      .catch(error => console.log(error));
  };

  const addNewColor = event => {
    event.preventDefault();

    AxiosWithAuth()
      .post('/api/colors', colorToEdit)
      .then(response => updateColors(response.data))
      .catch(error => console.log(error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <Container>
        <form onSubmit={saveEdit}>

            <TextField
              required
              placeholder={"Color Name..."}
              variant={"outlined"}
              margin={"normal"}
              label={"Color Name..."}
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />

            <TextField
              required
              placeholder={"Hex Code..."}
              variant={"outlined"}
              margin={"normal"}
              label={"Hex Code..."}
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          <ButtonGroup>
            <Container>
            <Button variant={"contained"} color="primary" type="submit">save</Button>
            <Button variant={"contained"} color="secondary" onClick={() => setEditing(false)}>cancel</Button>
            </Container>
          </ButtonGroup>
        </form>
        </Container>
      )}
      {/*<div className="spacer" />*/}
      {/* stretch - build another form here to add a color */}
      <Container>
      <form onSubmit={addNewColor}>
        <h3>Add New Color</h3>
          <TextField
            required
            placeholder={"Color Name..."}
            variant={"outlined"}
            margin={"normal"}
            label={"Color Name..."}
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />

          <TextField
            required
            placeholder={"Hex Code..."}
            variant={"outlined"}
            margin={"normal"}
            label={"Hex Code..."}
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        <Button variant={"contained"} margin="normal" color="primary" type={"submit"}>Add Color</Button>
      </form>
      </Container>
    </div>
  );
};

export default ColorList;
