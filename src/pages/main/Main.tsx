import axios from "axios";
import * as React from "react"
import apiUrl from "../../features/global/apiUrl"
import {POKEMON_BY_PAGE} from "../../features/global/pokemonNumber"
import {NUMBER_MAX_POKEMONS} from "../../features/global/pokemonNumber"
import Card from 'react-bootstrap/Card';
import PokemonInformation from "../../components/pokemon/PokemonInformation";
import { Link } from "react-router-dom";
import { CardGroup, Col, Container, Row } from "react-bootstrap";

interface IPokemonProps {
    id: string;
    name: string;
}

const Main : React.FC = () => {

    const [ pokemon, setPokemon ] = React.useState<IPokemonProps[]>([])
    const [pokemonSearch, setPokemonSearch] = React.useState('');
    const [pokemonListLimit, setPokemonListLimit] = React.useState(POKEMON_BY_PAGE);

    const pokemonList = React.useCallback(async () => {
        const res = await apiUrl.get('/pokemon', {
            params: {
                limit: POKEMON_BY_PAGE,
            },
        });
        setPokemon(res.data.results);
    },[]);

    React.useEffect(() => {
        pokemonList();
    }, [pokemonList])

    return <>
        <Container>
                <Row xm={1} md={5} className="g-4">
                    {pokemon.map((pokemon) => (
                        <Col>
                            <Card style={{ width: '13rem' }}>
                                <PokemonInformation  name = {pokemon.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>
        </Container>
    </>
}

export default Main