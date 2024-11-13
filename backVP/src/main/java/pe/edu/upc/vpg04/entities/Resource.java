package pe.edu.upc.vpg04.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Recursos")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idrecurso;
    @Column(name = "autor", length = 50, nullable = false)
    private String Autor;
    @Column(name = "tipo", length = 400, nullable = false)
    private String Tipo;
    @Column(name = "nombre", length = 400, nullable = false)
    private String nombre;
    @Column(name = "descripcion", length = 400, nullable = false)
    private String descripcion;

    public Resource() {
    }

    public Resource(int idrecurso, String autor, String tipo, String nombre, String descripcion, Users use) {
        this.idrecurso = idrecurso;
        Autor = autor;
        Tipo = tipo;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public int getIdrecurso() {
        return idrecurso;
    }

    public void setIdrecurso(int idrecurso) {
        this.idrecurso = idrecurso;
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



