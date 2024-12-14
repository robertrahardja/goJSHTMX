package main

import (
    "fmt"
    "net/http"
)

func main() {
    // Serve JavaScript file with correct MIME type for modules
    http.HandleFunc("/main.js", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/javascript")
        http.ServeFile(w, r, "main.js")
    })
    
    http.HandleFunc("/", handleHome)
    
    fmt.Println("Server starting on http://localhost:8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        panic(err)
    }
}

func handleHome(w http.ResponseWriter, r *http.Request) {
    component := hello("World")
    component.Render(r.Context(), w)
}
