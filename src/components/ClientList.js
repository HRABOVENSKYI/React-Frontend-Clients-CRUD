import React, { Component } from "react";
import { Button, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = { clients: [] };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    fetch("/clients")
      .then((response) => response.json())
      .then((data) => this.setState({ clients: data }));
  }

  async remove(id) {
    await fetch(`/clients/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedClients = [...this.state.clients].filter((i) => i.id !== id);
      this.setState({ clients: updatedClients });
    });
  }

  render() {
    const { clients, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const clientList = clients.map((client) => {
      return (
        <tr key={client.id}>
          <td style={{ whiteSpace: "nowrap" }}>{client.name}</td>
          <td>{client.email}</td>
          <td>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={"/clients/" + client.id}
            >
              Edit
            </Button>
            <Button
              className="mx-3"
              size="sm"
              color="danger"
              onClick={() => this.remove(client.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container>
          <div className="d-flex justify-content-between my-1">
            <h3>Clients</h3>
            <div>
              <Button color="success" tag={Link} to="/clients/new">
                Add Client
              </Button>
            </div>
          </div>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Name</th>
                <th width="30%">Email</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            <tbody>{clientList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ClientList;
