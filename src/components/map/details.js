import React, { Component } from "react";

import {
    Container,
    TypeTitle,
    RequestButton,
    RequestButtonText
} from "../css/details";

export default class Details extends Component {

    render() {

        return (

            <Container>

                <TypeTitle>Rota</TypeTitle>

                <RequestButton onPress={() => {}}>

                    <RequestButtonText>CADASTRAR</RequestButtonText>

                </RequestButton>

            </Container>

        );

    }

}