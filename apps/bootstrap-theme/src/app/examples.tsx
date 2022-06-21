export const Examples = [
  {
    dispalyName: 'Forms/Floating Labels',
    content: (
      <div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Input Group',
    content: (
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            @example.com
          </span>
        </div>
        <label htmlFor="basic-url" className="form-label">
          Your vanity URL
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            https://example.com/users/
          </span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <span className="input-group-text">.00</span>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
          />
          <span className="input-group-text">@</span>
          <input
            type="text"
            className="form-control"
            placeholder="Server"
            aria-label="Server"
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">With textarea</span>
          <textarea className="form-control" aria-label="With textarea" />
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Range',
    content: (
      <div>
        <label htmlFor="customRange1" className="form-label">
          Example range
        </label>
        <input type="range" className="form-range" id="customRange1" />
        <label htmlFor="disabledRange" className="form-label">
          Disabled range
        </label>
        <input
          type="range"
          className="form-range"
          id="disabledRange"
          disabled
        />
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Switch',
    content: (
      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Default switch checkbox input
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Checked switch checkbox input
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDisabled"
            disabled
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
            Disabled switch checkbox input
          </label>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckCheckedDisabled"
            checked
            disabled
          />
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckCheckedDisabled"
          >
            Disabled checked switch checkbox input
          </label>
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Radio Button',
    content: (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Default radio
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Default checked radio
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDisabled"
            id="flexRadioDisabled"
            disabled
          />
          <label className="form-check-label" htmlFor="flexRadioDisabled">
            Disabled radio
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDisabled"
            id="flexRadioCheckedDisabled"
            checked
            disabled
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioCheckedDisabled"
          >
            Disabled checked radio
          </label>
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Checkbox',
    content: (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Default checkbox
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Checked checkbox
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDisabled"
            disabled
          />
          <label className="form-check-label" htmlFor="flexCheckDisabled">
            Disabled checkbox
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckCheckedDisabled"
            checked
            disabled
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckCheckedDisabled"
          >
            Disabled checked checkbox
          </label>
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Select',
    content: (
      <div>
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option selected>Large select menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option selected>Small select menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
        <select
          className="form-select"
          multiple
          aria-label="multiple select example"
        >
          <option selected>Multiple select menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
        <select
          className="form-select"
          aria-label="Disabled select example"
          disabled
        >
          <option selected>Disabled menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
      </div>
    ),
  },

  {
    dispalyName: 'Forms/Control',
    content: (
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Disabled input"
          aria-label="Disabled input example"
          disabled
        />
        <input
          className="form-control"
          type="text"
          defaultValue="Disabled readonly input"
          aria-label="Disabled input example"
          disabled
          readOnly
        />
        <input
          className="form-control"
          type="text"
          defaultValue="Readonly input here..."
          aria-label="readonly input example"
          readOnly
        />
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>
        <label htmlFor="exampleColorInput" className="form-label">
          Color picker
        </label>
        <input
          type="color"
          className="form-control form-control-color"
          id="exampleColorInput"
          defaultValue="#563d7c"
          title="Choose your color"
        />
        <label htmlFor="exampleDataList" className="form-label">
          Datalist example
        </label>
        <input
          className="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search..."
        />
        <datalist id="datalistOptions">
          <option value="San Francisco"></option>
          <option value="New York"></option>
          <option value="Seattle"></option>
          <option value="Los Angeles"></option>
          <option value="Chicago"></option>
        </datalist>
      </div>
    ),
  },

  {
    dispalyName: 'Figure',
    content: (
      <figure className="figure">
        <img
          src="assets/images/engineer_288x288.gif"
          className="figure-img img-fluid rounded"
          alt="..."
        />
        <figcaption className="figure-caption text-end">
          A caption for the above image.
        </figcaption>
      </figure>
    ),
  },

  {
    dispalyName: 'Tables',
    content: (
      <div>
        <table className="table-primary">
          <tbody>
            <tr className="table-primary">
              <td className="table-primary">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-secondary">
          <tbody>
            <tr className="table-secondary">
              <td className="table-secondary">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-success">
          <tbody>
            <tr className="table-success">
              <td className="table-success">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-danger">
          <tbody>
            <tr className="table-danger">
              <td className="table-danger">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-warning">
          <tbody>
            <tr className="table-warning">
              <td className="table-warning">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-info">
          <tbody>
            <tr className="table-info">
              <td className="table-info">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-light">
          <tbody>
            <tr className="table-light">
              <td className="table-light">...</td>
            </tr>
          </tbody>
        </table>
        <table className="table-dark">
          <tbody>
            <tr className="table-dark">
              <td className="table-dark">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    dispalyName: 'Images',
    content: (
      <div className="text-center">
        <img
          src="assets/images/engineer_288x288.gif"
          className="rounded"
          alt="image_"
        />
      </div>
    ),
  },

  {
    dispalyName: 'Components/Alerts',
    content: (
      <div>
        <div className="alert alert-primary" role="alert">
          A simple primary alert—check it out!
        </div>
        <div className="alert alert-secondary" role="alert">
          A simple secondary alert—check it out!
        </div>
        <div className="alert alert-success" role="alert">
          A simple success alert—check it out!
        </div>
        <div className="alert alert-danger" role="alert">
          A simple danger alert—check it out!
        </div>
        <div className="alert alert-warning" role="alert">
          A simple warning alert—check it out!
        </div>
        <div className="alert alert-info" role="alert">
          A simple info alert—check it out!
        </div>
        <div className="alert alert-light" role="alert">
          A simple light alert—check it out!
        </div>
        <div className="alert alert-dark" role="alert">
          A simple dark alert—check it out!
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'Components/Cards',
    content: (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    ),
  },

  {
    dispalyName: 'List Group',
    content: (
      <ol className="list-group list-group-numbered">
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Content for list item
          </div>
          <span className="badge bg-primary rounded-pill">14</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Content for list item
          </div>
          <span className="badge bg-primary rounded-pill">14</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Subheading</div>
            Content for list item
          </div>
          <span className="badge bg-primary rounded-pill">14</span>
        </li>
      </ol>
    ),
  },

  {
    dispalyName: 'Components/Navbar',
    content: (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Features
              </a>
              <a className="nav-link" href="#">
                Pricing
              </a>
              <a className="nav-link disabled">Disabled</a>
            </div>
          </div>
        </div>
      </nav>
    ),
  },

  {
    dispalyName: 'Typography',
    content: (
      <div>
        <h1>h1. Bootstrap heading</h1>
        <h2>h2. Bootstrap heading</h2>
        <h3>h3. Bootstrap heading</h3>
        <h4>h4. Bootstrap heading</h4>
        <h5>h5. Bootstrap heading</h5>
        <h6>h6. Bootstrap heading</h6>

        <p className="h1">h1. Bootstrap heading</p>
        <p className="h2">h2. Bootstrap heading</p>
        <p className="h3">h3. Bootstrap heading</p>
        <p className="h4">h4. Bootstrap heading</p>
        <p className="h5">h5. Bootstrap heading</p>
        <p className="h6">h6. Bootstrap heading</p>

        <h1 className="display-1">Display 1</h1>
        <h1 className="display-2">Display 2</h1>
        <h1 className="display-3">Display 3</h1>
        <h1 className="display-4">Display 4</h1>
        <h1 className="display-5">Display 5</h1>
        <h1 className="display-6">Display 6</h1>

        <p>
          You can use the mark tag to <mark>highlight</mark> text.
        </p>
        <p>
          <del>This line of text is meant to be treated as deleted text.</del>
        </p>
        <p>
          <s>This line of text is meant to be treated as no longer accurate.</s>
        </p>
        <p>
          <ins>
            This line of text is meant to be treated as an addition to the
            document.
          </ins>
        </p>
        <p>
          <u>This line of text will render as underlined.</u>
        </p>
        <p>
          <small>This line of text is meant to be treated as fine print.</small>
        </p>
        <p>
          <strong>This line rendered as bold text.</strong>
        </p>
        <p>
          <em>This line rendered as italicized text.</em>
        </p>
      </div>
    ),
  },

  {
    dispalyName: 'End of Examples',
    content: <hr />,
  },
];
