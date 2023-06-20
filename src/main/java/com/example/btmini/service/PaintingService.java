package com.example.btmini.service;

import com.example.btmini.model.Category;
import com.example.btmini.model.Painting;
import com.example.btmini.repository.IPaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PaintingService implements IPaintingService {
    @Autowired
    IPaintingRepository paintingRepository;
    @Override
    public Iterable<Painting> findAll() {
        return paintingRepository.findAll();
    }

    @Override
    public Optional<Painting> findById(Long id) {
        return paintingRepository.findById(id);
    }

    @Override
    public Painting save(Painting painting) {
        return paintingRepository.save(painting);
    }

    @Override
    public void remote(Long id) {
        paintingRepository.deleteById(id);
    }
    @Override
    public List<Painting> findPaintingByCategory(Category category) {
        return paintingRepository.findPaintingByCategories(category);
    }
    @Override
    public List<Painting> findPaintingByName(String name) {
        return paintingRepository.findPaintingByName(name);
    }
}
