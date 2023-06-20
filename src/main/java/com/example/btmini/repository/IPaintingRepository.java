package com.example.btmini.repository;

import com.example.btmini.model.Category;
import com.example.btmini.model.Painting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IPaintingRepository extends JpaRepository<Painting, Long> {
    List<Painting> findPaintingByCategories(Category category);
    @Query("SELECT b FROM Painting as b WHERE b.name like %:name%")
    List<Painting> findPaintingByName(String name);
}
