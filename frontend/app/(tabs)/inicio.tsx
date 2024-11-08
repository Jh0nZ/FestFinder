import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import {
    FlatList,
    ImageBackground,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import Notch from "@/components/Notch";
import React from "react";
import { getCategorias } from "@/services/categoriasService";
import { getEstablecimientos } from "@/services/establecimientosServices";
import { getEventosDelDia, getEventosDelMes } from "@/services/eventosService";
import type { Evento } from "@/components/ListadoEventos";
import ListadoEventosInicio from "@/components/ListadoEventos";

interface Place {
    id: number;
    name: string;
    score: number;
    views: number;
    logo: any;
}

interface TipoEstablecimiento {
    id: number;
    nombre_tipo: string;
}

const inicio = () => {
    const [popularPlaces, setPopularPlaces] = useState<Place[]>([]);
    const [tags, setTags] = useState<TipoEstablecimiento[]>([]);
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [eventosDelMes, setEventosDelMes] = useState<Evento[]>([]);
    const [eventosDelDia, setEventosDelDia] = useState<Evento[]>([]);
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        fetchCategoriasEstablecimientos();
        fetchEventosDelMes();
        fetchEventosDelDia();
        fetchEstablecimientos();
    }, []);

    const fetchEstablecimientos = async () => {
        const establecimientos = await getEstablecimientos(null);
        setPopularPlaces(establecimientos); // Ajusta si el campo en tu API tiene otro nombre
    };

    const fetchCategoriasEstablecimientos = async () => {
        const categories = await getCategorias();
        setTags(categories); // Ajusta si el campo en tu API tiene otro nombre
    };

    const fetchEventosDelMes = async () => {
        const eventos = await getEventosDelMes();
        setEventosDelMes(eventos); // Ajusta si el campo en tu API tiene otro nombre
    };

    const fetchEventosDelDia = async () => {
        const eventos = await getEventosDelDia();
        console.log(eventos[0].id_evento);
        setEventosDelDia(eventos); // Ajusta si el campo en tu API tiene otro nombre
    };

    const handleSubmitSearch = () => {
        console.log("buscando " + search);
        setOpenSearch(false);
    };

    const searchPress = () => {
        if (openSearch) {
            handleSubmitSearch();
        }
        setOpenSearch(!openSearch);
    };

    return (
        <>
            <Notch />
            <ScrollView>
                
                <Text style={styles.textoTitulo}>Categorias</Text>
                <FlatList
                    data={tags}
                    style={styles.slider}
                    keyExtractor={(item) => JSON.stringify(item)}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => {}}
                            style={{
                                alignItems: "center",
                                marginHorizontal: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    textAlign: "center",
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: "#956ca3",
                                    color: "#956ca3",
                                    paddingHorizontal: 10,
                                    paddingVertical: 4,
                                    lineHeight: 24,
                                }}
                            >
                                {item.nombre_tipo}
                            </Text>
                        </Pressable>
                    )}
                    horizontal
                />

                <Text style={[styles.textoTitulo, { marginTop: "5%" }]}>
                    Eventos hoy
                </Text>

                <ListadoEventosInicio eventos={eventosDelDia} />
                <View style={{ alignItems: "center", marginTop: "3%" }}>
                    <View
                        style={{
                            backgroundColor: "#FDC500",
                            width: 320,
                            height: 120,
                            borderRadius: 10,
                            flexDirection: "row",
                            padding: 10,
                        }}
                    >
                        <Image
                            source={require("../../assets/images/ticket.png")}
                            style={{
                                width: "40%",
                                height: "100%",
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                resizeMode: "contain",
                            }}
                        />
                        <View
                            style={{
                                width: "60%",
                                paddingLeft: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 16,
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                Reserva tus entradas
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 16,
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                &
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 13,
                                    color: "black",
                                }}
                            >
                                No vivas de horas de filas
                            </Text>
                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    marginTop: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        fontSize: 14,
                                        color: "black",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Ver eventos
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingHorizontal: "5%",
                    }}
                >
                    <Text style={[styles.textoTitulo, { marginTop: "5%" }]}>
                        Lugares populares
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.navigate("/places/popular");
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 14,
                                    color: "#402158",
                                    marginTop: 15,
                                }}
                            >
                                Ver más
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#402158",
                                    marginLeft: 5,
                                    marginTop: 15,
                                }}
                            >
                                &gt;
                            </Text>
                        </View>
                    </Pressable>
                </View>

                <FlatList
                    data={popularPlaces}
                    style={styles.slider}
                    keyExtractor={(item) => JSON.stringify(item)}
                    renderItem={({ item }) => (
                        <Link
                            href={("/places/" + item.id) as Href}
                            style={{ marginLeft: "3%" }}
                        >
                            <ImageBackground
                                resizeMode="cover"
                                source={{ uri: `${item.logo}` }}
                                style={{
                                    width: 150,
                                    height: 200,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        padding: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            fontFamily: "Poppins-Regular",
                                            textAlign: "center",
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                        }}
                                    >
                                        <FontAwesome
                                            name="star"
                                            color={"yellow"}
                                        />
                                        {item.score} / 10
                                    </Text>
                                </View>
                            </ImageBackground>
                            <Text>{item.name}</Text>
                        </Link>
                    )}
                    horizontal
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingHorizontal: "5%",
                    }}
                >
                    <Text style={[styles.textoTitulo, { marginTop: "5%" }]}>
                        Eventos populares del mes
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.navigate("/eventos/popular");
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 14,
                                    color: "#402158",
                                    marginTop: 15,
                                }}
                            >
                                Ver más
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#402158",
                                    marginLeft: 5,
                                    marginTop: 15,
                                }}
                            >
                                &gt;
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ marginBottom: "5%" }}>
                    <ListadoEventosInicio eventos={eventosDelMes} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    textoTitulo: {
        fontWeight: "bold" as "bold",
        fontSize: 18,
        marginLeft: "3%",
    },
    slider: {
        marginLeft: "5%",
        marginTop: "3%",
    },
});

export default inicio;
