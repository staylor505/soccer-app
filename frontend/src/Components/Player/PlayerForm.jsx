/* global M */
import React, { useState, useEffect, useRef } from "react";
import api, { buildAssetUrl } from "../../api.jsx";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  iscoach: false,
  team: "",
  speed: "",
  strength: "",
  endurance: "",
  ability: "",
  techniques: "",
  tactical: "",
};

function PlayerForm(props) {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.editingPlayer) {
      setFormData(props.editingPlayer);
      setImagePreview(buildAssetUrl(props.editingPlayer.image));
    } else {
      setFormData(initialFormData);
      setImagePreview(null);
    }
    setImageFile(null);
    setRemoveImage(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFeedback(null);
  }, [props.editingPlayer]);

  useEffect(() => {
    if (window.M) {
      M.updateTextFields();
    }
  }, [formData]);

  function buildFormData() {
    const fd = new FormData();
    fd.append("firstName", formData.firstName);
    fd.append("lastName", formData.lastName);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone || "");
    fd.append("iscoach", formData.iscoach);
    fd.append("team", formData.team || "");
    fd.append("speed", formData.speed === "" ? "" : Number(formData.speed));
    fd.append("strength", formData.strength === "" ? "" : Number(formData.strength));
    fd.append("endurance", formData.endurance === "" ? "" : Number(formData.endurance));
    fd.append("ability", formData.ability === "" ? "" : Number(formData.ability));
    fd.append("techniques", formData.techniques === "" ? "" : Number(formData.techniques));
    fd.append("tactical", formData.tactical === "" ? "" : Number(formData.tactical));
    if (imageFile) {
      fd.append("image", imageFile);
    }
    if (removeImage) {
      fd.append("removeImage", "true");
    }
    return fd;
  }

  async function submitPlayer(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      let response;
      const fd = buildFormData();
      if (props.editingPlayer && props.editingPlayer._id) {
        response = await api.put(`/players/${props.editingPlayer._id}`, fd);
        setFeedback({ type: "success", message: "Player updated successfully." });
      } else {
        response = await api.post("/players", fd);
        setFormData(initialFormData);
        setImageFile(null);
        setImagePreview(null);
        setRemoveImage(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setFeedback({ type: "success", message: "Player added successfully." });
      }

      if (props.onPlayerSaved) {
        props.onPlayerSaved(response.data);
      }
    } catch (error) {
      const validationMessage = error.response && error.response.data && error.response.data.errors
        ? error.response.data.errors.map((item) => item.message).join(" ")
        : null;

      setFeedback({
        type: "error",
        message:
          validationMessage ||
          (error.response && error.response.data && error.response.data.message) ||
          "Unable to save the player right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleCheckBox(event) {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCancel() {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (props.onCancelEdit) {
      props.onCancelEdit();
    }
  }

  const isEditing = props.editingPlayer && props.editingPlayer._id;
  const title = isEditing ? "Edit Player" : "Add a new player";
  const submitButtonText = isEditing ? "Update Player" : "Add Player";

  return (
    <div className="row panel-card form-panel">
      <h1 className="center">{title}</h1>

      {feedback ? (
        <p className={`form-feedback ${feedback.type}`}>{feedback.message}</p>
      ) : null}

      <form className="col s12" onSubmit={submitPlayer}>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="input-field col s6">
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="input-field col s6">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s6">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input-field col s6">
            <label>
              <input
                id="iscoach"
                name="iscoach"
                className="filled-in"
                type="checkbox"
                checked={formData.iscoach}
                onChange={handleCheckBox}
              />
              <span>Is Coach?</span>
            </label>
          </div>
          <div className="input-field col s6">
            <input
              id="team"
              name="team"
              type="text"
              value={formData.team}
              onChange={handleChange}
            />
            <label htmlFor="team">Team</label>
          </div>
          <div className="input-field col s6">
            <input
              id="speed"
              name="speed"
              type="number"
              min="1"
              max="5"
              value={formData.speed}
              onChange={handleChange}
            />
            <label htmlFor="speed">Speed</label>
          </div>
          <div className="input-field col s6">
            <input
              id="strength"
              name="strength"
              type="number"
              min="1"
              max="5"
              value={formData.strength}
              onChange={handleChange}
            />
            <label htmlFor="strength">Strength</label>
          </div>
          <div className="input-field col s6">
            <input
              id="endurance"
              name="endurance"
              type="number"
              min="1"
              max="5"
              value={formData.endurance}
              onChange={handleChange}
            />
            <label htmlFor="endurance">Endurance</label>
          </div>
          <div className="input-field col s6">
            <input
              id="ability"
              name="ability"
              type="number"
              min="1"
              max="5"
              value={formData.ability}
              onChange={handleChange}
            />
            <label htmlFor="ability">Ability</label>
          </div>
          <div className="input-field col s6">
            <input
              id="techniques"
              name="techniques"
              type="number"
              min="1"
              max="5"
              value={formData.techniques}
              onChange={handleChange}
            />
            <label htmlFor="techniques">Techniques</label>
          </div>
          <div className="input-field col s6">
            <input
              id="tactical"
              name="tactical"
              type="number"
              min="1"
              max="5"
              value={formData.tactical}
              onChange={handleChange}
            />
            <label htmlFor="tactical">Tactical</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12" style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "#16423c", fontWeight: 600 }}>
              Player Photo
            </label>
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "50%", marginBottom: "0.5rem", display: "block" }}
                />
                <span style={{ fontSize: "0.82rem", color: "#888", display: "block", marginBottom: "0.75rem" }}>
                  Select a new file below to replace the current photo.
                </span>
                <div className="photo-actions">
                  <button
                    type="button"
                    className="btn waves-effect waves-light red lighten-2 app-btn-large"
                    onClick={handleRemoveImage}
                  >
                    <i className="material-icons left">delete</i>
                    Remove Photo
                  </button>
                  <label
                    htmlFor="playerPhotoInput"
                    className="btn waves-effect waves-light blue-grey lighten-1 app-btn-large"
                    style={{ cursor: "pointer", margin: 0 }}
                  >
                    <i className="material-icons left">upload</i>
                    Choose Photo
                  </label>
                </div>
              </>
            ) : removeImage ? (
              <>
                <span style={{ fontSize: "0.82rem", color: "#c0392b", display: "block", marginBottom: "0.75rem" }}>
                  Photo will be removed on save. Upload a new file below to replace it instead.
                </span>
                <label
                  htmlFor="playerPhotoInput"
                  className="btn waves-effect waves-light blue-grey lighten-1 app-btn-large"
                  style={{ cursor: "pointer" }}
                >
                  <i className="material-icons left">upload</i>
                  Choose Photo
                </label>
              </>
            ) : (
              <>
                <span style={{ fontSize: "0.82rem", color: "#888", display: "block", marginBottom: "0.75rem" }}>
                  Upload a photo of the player (JPG, PNG, or WebP, max 5 MB).
                </span>
                <label
                  htmlFor="playerPhotoInput"
                  className="btn waves-effect waves-light blue-grey lighten-1 app-btn-large"
                  style={{ cursor: "pointer" }}
                >
                  <i className="material-icons left">upload</i>
                  Choose Photo
                </label>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              id="playerPhotoInput"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 form-actions">
            <button
              className="btn waves-effect waves-light teal darken-2 app-btn-large"
              type="submit"
              name="action"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : submitButtonText}
            </button>
            <button
              className="btn waves-effect waves-light grey"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlayerForm;
