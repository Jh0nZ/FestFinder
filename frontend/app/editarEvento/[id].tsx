import Header from "@/components/Header";
import Styles from "@/globalStyles/styles";
import { useSession } from "@/hooks/ctx";
import { dateToDDMMYYYY, dateToHHmm, showSingleDate, showSingleTime } from "@/utils/DateTime";
import { getImage, pickImage } from "@/utils/Image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView, Text, TextInput, View } from "react-native";

const imagen_defecto = require("../../assets/images/default_image.png");

const EditarEvento = () => {
    const {session} = useSession()
    const [nombre, setNombre] = useState("");
    const [logo, setImagenEvento] = useState<ImagePickerAsset>();
    const [horario_inicio, setHoraInicio] = useState<Date>(new Date());
    const [horario_fin, setHoraFin] = useState<Date>(new Date());
    const [descripcion, setDescripcion] = useState("");
    const [precioInicial, setPrecioInicial] = useState("0");
    const [precioFinal, setPrecioFinal] = useState("0");
    const [error, setError] = useState("");
    const {id} = useLocalSearchParams()
    useEffect(()=>{
        // hacer el fetch de los datos del local
    })

    const handleDelete = ()=>{
        //eliminar con el id
        console.log("eliminando", id)
    }

    const handleSubmit = async () => {
        if (session){
            const {id_usuario} = session
        }

        if (logo === undefined) {
            setError("Seleccione una imagen");
            return;
        }
        const formData = new FormData();
        if (logo?.uri) {
            formData.append("logo",getImage(logo));
        }

        formData.append("nombre", nombre);
        formData.append("fecha_inicio", dateToDDMMYYYY(horario_inicio));
        formData.append("horario_inicio", dateToHHmm(horario_inicio));
        formData.append("horario_fin", dateToHHmm(horario_fin));

        formData.append("descripcion", descripcion);
        formData.append("precioInicial", precioInicial);
        formData.append("precioFinal", precioFinal);

        console.log(formData);
        //enviar al servidor
        
        //enviar al los eventos una vez registrado
        //router.push('admin/eventos' as Href)
    };
    return (
        <ScrollView>
            <View>
                <Header title="Editar evento" />
                <View style={{ alignItems: "center" }}>
                    <ImageBackground
                        source={logo ? { uri: logo.uri } : imagen_defecto}
                        alt="imagen Evento"
                        style={{
                            backgroundColor: "gray",
                            height: 250,
                            width: 200,
                            position: "relative",
                            marginTop: "3%",
                            borderRadius: 20,

                        }}
                    >
                        <Pressable
                            style={{
                                position: "absolute",
                                top: "auto",
                                left: "auto",
                                bottom: 5,
                                right: 5,
                                borderRadius: 15,
                            }}
                            onPress={() => {
                                pickImage(setImagenEvento, [3, 4]);
                            }}
                        >
                            <FontAwesome name="camera" size={30} />
                        </Pressable>
                    </ImageBackground>
                    <Text style={{
                        fontWeight: "600",
                        fontSize: 18,
                        color: "#333",
                        marginTop: "3%",
                        alignSelf: "flex-start",
                        marginLeft: "10%"
                    }}>
                        Nombre
                    </Text>

                    <TextInput
                        placeholder="Nombre"
                        onChangeText={(e) => setNombre(e)}
                        style={[Styles.input, { marginTop: "3%" }]}
                    />
                </View>
                <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: '3%', }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={{ fontWeight: "600", fontSize: 18, color: "#333", marginBottom: 8 }}>Fecha</Text>
                            <Pressable
                                onPress={() => showSingleDate (horario_inicio, setHoraInicio)}
                                style={[Styles.input, { width: '80%', alignItems: 'center' }]}
                            >
                                <Text>{dateToDDMMYYYY(horario_inicio)}</Text>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={{ fontWeight: "600", fontSize: 18, color: "#333", marginBottom: 8 }}>Hora</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
                                <Pressable
                                    onPress={() => showSingleTime(horario_inicio, setHoraInicio)}
                                    style={[Styles.input, { flex: 1, maxWidth: 120, alignItems: 'center', marginRight: 5 }]}
                                >
                                    <Text>{dateToHHmm(horario_inicio)}</Text>
                                </Pressable>
                                <Text>-</Text>
                                <Pressable
                                    onPress={() => showSingleTime(horario_fin, setHoraFin)}
                                    style={[Styles.input, { flex: 1, maxWidth: 120, alignItems: 'center', marginLeft: 5 }]}
                                >
                                    <Text>{dateToHHmm(horario_fin)}</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '2%', marginLeft: "10%" }}>
                    <Text style={{ fontWeight: "600", fontSize: 18, color: "#333", marginBottom: 8 }}>Rango de Precio</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                        <TextInput
                            onChangeText={(e) => setPrecioInicial(e)}
                            keyboardType="number-pad"
                            placeholder="00"
                            style={[Styles.input, { flex: 1, maxWidth: 120, marginRight: 5 }]}
                        />
                        <Text>-</Text>
                        <TextInput
                            onChangeText={(e) => setPrecioFinal(e)}
                            keyboardType="number-pad"
                            placeholder="00"
                            style={[Styles.input, { flex: 1, maxWidth: 120, marginLeft: 5 }]}
                        />
                    </View>
                </View>
                <Text style={{ fontWeight: "600", fontSize: 18, color: "#333", marginBottom: 8, marginLeft: "10%" }}>
                    Descripción
                </Text>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                    <TextInput
                        multiline
                        onChangeText={(e) => setDescripcion(e)}
                        placeholder="Ingresa una descripción para tu evento"
                        style={{
                            width: "90%",
                            minHeight: 100,
                            padding: 10,
                            borderColor: "#ccc",
                            borderWidth: 1,
                            borderRadius: 8,
                            backgroundColor: "#f9f9f9",
                            textAlignVertical: "top",
                            fontSize: 16,
                            color: "#333"
                        }}
                    />
                </View>
                {error && <Text style={{ color: "red" }}>{error}</Text>}
                <View style={{alignItems:"center"}}>
                    <Pressable onPress={handleSubmit} style={[Styles.button]}>
                        <Text style={Styles.buttonText}>Guardar Cambios</Text>
                    </Pressable>
                    <Pressable onPress={()=>{router.back()}} style={[Styles.button,{backgroundColor: "orange"}]}>
                        <Text style={Styles.buttonText}>Cancelar</Text>
                    </Pressable>
                    <Pressable onPress={handleDelete} style={[Styles.button,{marginBottom: 30, backgroundColor: "red"}]}>
                        <Text style={Styles.buttonText}>Eliminar Evento</Text>
                    </Pressable>
                </View>
                
            </View>
        </ScrollView>
    );
};

export default EditarEvento;