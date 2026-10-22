import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "../../lib/estilos";

export default function TabsLayout(){
    return (
        <Tabs 
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: cores.primaria,
            tabBarInactiveTintColor: cores.suave,
            tabBarLabelStyle: {fontSize: 11, fontWeight: "600"},
        }}
        >
            <Tabs.Screen
            name = "index"
            options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => <Ionicons name = "home" size={size} color={color} />,
            }}
            />

            <Tabs.Screen
            name = "academico"
            options={{
                title: "Acadêmico",
                tabBarIcon: ({ color, size }) => <Ionicons name = "school" size={size} color={color} />,
            }}
            />
            <Tabs.Screen
            name = "profissional"
            options={{
                title: "Profissional",
                tabBarIcon: ({ color, size }) => <Ionicons name = "briefcase" size={size} color={color} />,
            }}
            />
            <Tabs.Screen
            name = "projetos"
            options={{
                title: "Projetos",
                tabBarIcon: ({ color, size }) => <Ionicons name = "code-slash" size={size} color={color} />,
            }}
            />
            <Tabs.Screen
            name = "sobre"
            options={{
                title: "Sobre",
                tabBarIcon: ({ color, size }) => <Ionicons name = "information-circle" size={size} color={color} />,
            }}
            />
            </Tabs>
    );
}