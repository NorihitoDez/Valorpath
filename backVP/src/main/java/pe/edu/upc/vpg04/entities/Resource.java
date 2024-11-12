package pe.edu.upc.vpg04.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Recursos")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "autor", length = 50, nullable = false)
    private String Autor;
    @Column(name = "tipo", length = 400, nullable = false)
    private String Tipo;
    @Column(name = "nombre", length = 400, nullable = false)
    private String nombre;
    @Column(name = "descripcion", length = 400, nullable = false)
    private String descripcion;
    @ManyToOne
    @JoinColumn(name = "idUsers")
    private Users use;

    public Resource() {
    }

    public Resource(int id, String autor, String tipo, String nombre, String descripcion, Users use) {
        this.id = id;
        Autor = autor;
        Tipo = tipo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.use = use;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Users getUse() {
        return use;
    }

    public void setUse(Users use) {
        this.use = use;
    }
}



