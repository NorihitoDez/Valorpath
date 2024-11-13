package pe.edu.upc.vpg04.dtos;

import pe.edu.upc.vpg04.entities.Users;

public class ResourceDTO {

    private int idrecurso;
    private String Autor;
    private String Tipo;
    private String nombre;
    private String descripcion;

    public int getId() {
        return idrecurso;
    }

    public void setId(int id) {
        this.idrecurso = id;
    }

    public String getAutor() {
        return Autor;
    }

    public void setAutor(String autor) {
        Autor = autor;
    }

    public String getTipo() {
        return Tipo;
    }

    public void setTipo(String tipo) {
        Tipo = tipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


}
