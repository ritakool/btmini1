package com.example.btmini.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table (name = "Painting")
public class Painting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int height;
    private int width;
    private String material;
    private String description;
    private int price;
    @ManyToMany
    @JoinTable(name = "painting_category",
            joinColumns = @JoinColumn(name = "painting_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;
}
