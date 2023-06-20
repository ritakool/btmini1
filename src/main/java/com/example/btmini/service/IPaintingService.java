package com.example.btmini.service;

import com.example.btmini.model.Category;
import com.example.btmini.model.Painting;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;


public interface IPaintingService extends IGeneralService<Painting> {
    List<Painting> findPaintingByCategory(Category category);

    List<Painting> findPaintingByName(String name);
}
