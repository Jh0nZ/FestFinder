import GoogleMap from "@/components/GoogleMap";
import Styles from "@/globalStyles/styles";
import { getCategorias } from "@/services/categoriasService";
import { getDireccion } from "@/utils/Direccion";
import { router } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/ctx";
import { Pressable, View, StyleSheet, TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { LatLng } from "react-native-maps";
import Header from "@/components/Header";
import TextInputWithHelper from "@/components/TextInputWithHelperText";
import { Button, HelperText, useTheme, Text } from "react-native-paper";
import MyDropdown from "@/components/MyDropDown";
import ErrorText from "@/components/ErrorText";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{8}$/;

interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    rango_de_precios: string;
    tipo: string;
}

interface Errors {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    rango_de_precios: string;
    tipo: string;
}

const fieldNames: { [key in keyof FormData]: string } = {
    nombre: "Nombre",
    email: "Email",
    telefono: "Teléfono",
    direccion: "Dirección",
    rango_de_precios: "Rango de precios",
    tipo: "Tipo de establecimiento",
};

const register_business = () => {
    const { session } = useSession();
    const theme = useTheme();
    const [location, setLocation] = useState<LatLng | null>(null);
    const [coordenada_x, setCoordenadaX] = useState<number>();
    const [coordenada_y, setCoordenadaY] = useState<number>();
    const [toggleMap, setToggleMap] = useState(false);
    const [dataTypesBusiness, setDataTypesBusiness] = useState([]);
    const dataRango = ["50 -100 Bs", "100Bs - 200Bs", "+200Bs"];

    const [formData, setFormData] = useState<FormData>({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        rango_de_precios: "",
        tipo: "",
    });
    const [errors, setErrors] = useState<Errors>({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        rango_de_precios: "",
        tipo: "",
    });

    useEffect(() => {
        const clearError = (field: keyof FormData) => {
            if (formData[field]) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: "",
                }));
            }
        };
        // Itera sobre cada campo en formData y limpia su error si tiene valor
        Object.keys(formData).forEach((key) => {
            const field = key as keyof FormData;
            clearError(field);
        });
    }, [formData]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categorias = await getCategorias();
            const formattedCategorias = categorias.map((categoria: any) => ({
                key: categoria.id,
                value: categoria.nombre_tipo,
            }));

            setDataTypesBusiness(formattedCategorias);
        };

        fetchCategorias();
    }, []);

    const handleNext = () => {
        const newErrors = { ...errors };
        Object.keys(formData).forEach((field) => {
            const key = field as keyof FormData;

            console.log();
            const value = formData[key].toString().trim();

            if (!value) {
                // Campo vacío
                newErrors[key] = `El campo ${fieldNames[key]} es obligatorio`;
            } else {
                // Validación específica para cada campo
                switch (key) {
                    case "email":
                        if (!emailRegex.test(value)) {
                            newErrors[key] =
                                "El formato del correo electrónico es inválido";
                        } else {
                            newErrors[key] = "";
                        }
                        break;
                    case "telefono":
                        if (!phoneRegex.test(value)) {
                            newErrors[key] =
                                "El teléfono debe tener exactamente 8 dígitos";
                        } else {
                            newErrors[key] = "";
                        }
                        break;
                    default:
                        newErrors[key] = ""; // Limpia cualquier error anterior para campos válidos
                        break;
                }
            }
        });

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(
            (error) => error !== ""
        );
        if (!hasErrors) {
            const dataBusiness = {
                nombre: formData.nombre,
                direccion: formData.direccion,
                nro_ref: formData.telefono,
                em_ref: formData.email,
                tipo_fk: formData.tipo,
                rango_de_precios: formData.rango_de_precios,
                id_usuario: session?.id_usuario,
                coordenada_x: coordenada_x,
                coordenada_y: coordenada_y,
            };

            router.push({
                pathname: "/business/preview",
                params: dataBusiness,
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {toggleMap && (
                <View
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        zIndex: 10,
                        flex: 1,
                    }}
                >
                    <GoogleMap
                        selectedLocation={location}
                        setSelectedLocation={setLocation}
                        onPressConfirmLocation={async () => {
                            setToggleMap(false);
                            if (location) {
                                setCoordenadaX(
                                    Number(location.longitude.toFixed(8))
                                );
                                setCoordenadaY(
                                    Number(location.latitude.toFixed(8))
                                );

                                const direccion = await getDireccion(
                                    location.latitude,
                                    location.longitude
                                );
                                setFormData({
                                    ...formData,
                                    direccion: direccion,
                                });
                            }
                        }}
                    />
                </View>
            )}

            <Header title="Registro de establecimiento" />
            <View
                style={{
                    flex: 1,
                    padding: 20,
                    alignItems: "center",
                }}
            >
                <TextInput
                    placeholder="Nombre del negocio"
                    keyboardType="default"
                    placeholderTextColor="#402158"
                    style={Styles.input}
                    onChangeText={(text) => {
                        setFormData({ ...formData, nombre: text });
                    }}
                />
                <ErrorText error={errors.nombre} />

                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#402158"
                    style={Styles.input}
                    onChangeText={(text) => {
                        setFormData({ ...formData, email: text });
                    }}
                />
                <ErrorText error={errors.email} />

                <TextInput
                    placeholder="Telefono"
                    keyboardType="number-pad"
                    placeholderTextColor="#402158"
                    style={Styles.input}
                    onChangeText={(text) => {
                        setFormData({ ...formData, telefono: text });
                    }}
                />
                <ErrorText error={errors.telefono} />

                <Pressable
                    onPress={() => {
                        setToggleMap(true);
                    }}
                    style={Styles.input}
                >
                    <Text
                        style={{
                            color: "#402158",
                            paddingTop: 2,
                            paddingBottom: 2,
                        }}
                    >
                        {location
                            ? `Cambiar Ubicacion de ${formData.direccion}` || ""
                            : "Seleccionar ubicación"}
                    </Text>
                </Pressable>

                <ErrorText error={errors.direccion} />

                <SelectList
                    setSelected={(selected: string) =>
                        setFormData({ ...formData, tipo: selected })
                    }
                    data={dataTypesBusiness}
                    save="key"
                    searchPlaceholder="Buscar"
                    placeholder="Tipo de negocio"
                    boxStyles={Styles.input}
                    dropdownStyles={Styles.inputDropDown}
                    search={false}
                />
                <ErrorText error={errors.tipo} />

                <Text
                    style={[
                        Styles.textDecoration2,
                        {
                            marginBottom: 10,
                            marginLeft: 30,
                            alignSelf: "flex-start",
                        },
                    ]}
                >
                    Rango de precios del local:
                </Text>
                <View style={{ alignItems: "center", marginBottom: 3 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "80%",
                        }}
                    >
                        {dataRango.map((value, index) => (
                            <View style={{}}>
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        setFormData({
                                            ...formData,
                                            rango_de_precios: value,
                                        });
                                    }}
                                    style={[
                                        value === formData.rango_de_precios
                                            ? styles.buttonSelected
                                            : styles.button,
                                        { width: "100%", paddingVertical: 10 },
                                    ]}
                                >
                                    <Text
                                        style={
                                            value === formData.rango_de_precios
                                                ? styles.textSelected
                                                : styles.text
                                        }
                                    >
                                        {"$".repeat(index + 1)}
                                    </Text>
                                </Pressable>
                                <Text style={styles.text}>{value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <ErrorText error={errors.rango_de_precios} />

                <Button
                    onPress={handleNext}
                    mode="contained"
                    style={{ marginTop: 20 }}
                >
                    Siguiente
                </Button>

                <View style={{ alignItems: "center" }}>
                    <View
                        style={[
                            Styles.lineContainer,
                            {
                                marginBottom: 30,
                                flexDirection: "row",
                                justifyContent: "center",
                                gap: 10,
                            },
                        ]}
                    >
                        <View
                            style={[Styles.lineSelected, { borderRadius: 10 }]}
                        />
                        <View style={[Styles.line, { borderRadius: 10 }]} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default register_business;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: "25%",
        borderColor: "#7d5683",
        borderWidth: 2,
        backgroundColor: "#fef5ff",
        borderRadius: 10,
        padding: 3,
        alignItems: "center",
        marginHorizontal: 5,
    },
    text: {
        color: "#7d5683",
        fontSize: 16,
    },
    buttonSelected: {
        width: "25%",
        borderColor: "#fef5ff",
        borderWidth: 2,
        backgroundColor: "#7d5683",
        borderRadius: 10,
        padding: 3,
        alignItems: "center",
        marginHorizontal: 5,
    },
    textSelected: {
        color: "#fef5ff",
        fontSize: 16,
    },
});
