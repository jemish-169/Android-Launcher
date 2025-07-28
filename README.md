# Android Project Generator 🚀

📦 Generates a downloadable `.zip` containing a fully functional Android Studio project with selected tools, architecture, and design.

🌐 **Live Demo**: [android-launcher.netlify.app](https://android-launcher.netlify.app/)

---

## 🔧 Features

- 🎨 **UI Toolkit**: Jetpack Compose or XML Views
- 📚 **Dependency Injection**: Hilt, Koin or None
- 🌐 **Networking**: Retrofit, Ktor or None
- 🔐 **Permissions**: Select from Internet, Camera, Contacts, etc.
- 💾 **Local Storage**: DataStore, SharedPreferences, or None
- 🧩 **Serialization**: Gson, Moshi, or Kotlinx.serialization
- 🗂 **Navigation**: Jetpack Navigation (XML) or Compose Navigation
- 🌍 **Internationalization (i18n)**: Multilingual `strings.xml` support
- 🎨 **Theme Customization**: Choose primary, secondary, and tertiary colors
- 🔤 **Typography**: Select from fonts like Roboto, Poppins, Inter, etc.
- 🧪 **Modern Build Support**: Supports `.kts` with `libs.versions.toml` or legacy `.gradle` files
- 🛠 **ViewBinding, Room, Dark Mode** support with toggles
- 🔄 **Dynamic JSON Config Generation**: Used to drive backend `.zip` generation

---

## 🖥️ How It Works

1. Visit the [Web App](https://android-launcher.netlify.app/)
2. Select your configuration using the form
3. A `.json` file is generated based on your inputs
4. The backend reads this JSON and produces a complete Android project ZIP
5. Download and open in Android Studio!
