package com.example.btmini.controller;

import com.example.btmini.model.Category;
import com.example.btmini.model.Painting;
import com.example.btmini.service.ICategoryService;
import com.example.btmini.service.IPaintingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/")
public class PaintingControllerRestFull {
    @Autowired
    private ICategoryService iCategoryService;
    @Autowired
    private IPaintingService iPaintingService;

    @GetMapping("painting")
    public ResponseEntity<Iterable<Painting>> findAllPainting() {
        Iterable<Painting> paintings = iPaintingService.findAll();
        if (paintings != null) {
            return new ResponseEntity<>(paintings, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("painting/{id}")
    public ResponseEntity<Painting> findById(@PathVariable Long id) {
        Optional<Painting> result = iPaintingService.findById(id);
        if (result.isPresent()) {
            return new ResponseEntity<>(result.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("painting")
    public ResponseEntity<Painting> addPainting(@RequestBody Painting painting) {
        Painting painting1 = iPaintingService.save(painting);
        return new ResponseEntity<>(painting1, HttpStatus.CREATED);
    }

    @PutMapping("painting/{PaintId}")
    public ResponseEntity<Painting> updatePainting(@PathVariable Long PaintId, @RequestBody Painting painting) {
        Optional<Painting> painting1 = iPaintingService.findById(PaintId);
        if (painting1.isPresent()) {
            painting1.get().setName(painting.getName());
            painting1.get().setHeight(painting.getHeight());
            painting1.get().setWidth(painting.getWidth());
            painting1.get().setMaterial(painting.getMaterial());
            painting1.get().setCategories(painting.getCategories());
            painting1.get().setPrice(painting.getPrice());
            iPaintingService.save(painting1.get());
            return new ResponseEntity<>(painting1.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // tìm kiếm tên gần đúng
    @GetMapping("painting/search")
    public ResponseEntity<Iterable<Painting>> findByName(@RequestParam("name") String name) {
        Iterable<Painting> painting = iPaintingService.findPaintingByName(name);
        if (painting != null) {
            return new ResponseEntity<>(painting, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("painting/searchbycategory/{categoryId}")
    public ResponseEntity<Iterable<Painting>> findByCategory(@PathVariable Long categoryId) {

        Category category = iCategoryService.findById(categoryId).orElse(null);
        if (category != null) {
            Iterable<Painting> iterable = iPaintingService.findPaintingByCategory(category);
            if (iterable != null) {
                return new ResponseEntity<>(iterable, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("category")
    public ResponseEntity<Iterable<Category>> findAllCategory() {
        Iterable<Category> categories = iCategoryService.findAll();
        if (categories!= null) {
            return new ResponseEntity<>(categories, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
