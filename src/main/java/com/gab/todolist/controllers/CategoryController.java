package com.gab.todolist.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gab.todolist.dtos.CategoryRecordDto;
import com.gab.todolist.entities.Category;
import com.gab.todolist.entities.Task;
import com.gab.todolist.repositories.CategoryRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/category")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController{
	
	@Autowired
	private CategoryRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categoryList = repository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(categoryList);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> getCategoryById(@PathVariable(value = "id") Long id){
		Optional<Category> categoryO = repository.findById(id);
		if (categoryO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
		}
		return ResponseEntity.status(HttpStatus.OK).body(categoryO);
	}

	
	@PostMapping
	public ResponseEntity<Category> saveCategory(@RequestBody @Valid CategoryRecordDto categoryRecordDto) {
		var category = new Category();
		BeanUtils.copyProperties(categoryRecordDto, category);
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(category));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateCategory(@PathVariable(value="id") Long id, @RequestBody @Valid CategoryRecordDto categoryRecordDto){
		Optional<Category> categoryO = repository.findById(id);
		if(categoryO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
		}
		var category = categoryO.get();
		BeanUtils.copyProperties(categoryRecordDto, category);
		return ResponseEntity.status(HttpStatus.OK).body(repository.save(category));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteCategory(@PathVariable(value="id") Long id){
		Optional<Category> categoryO = repository.findById(id);
		if(categoryO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
		}
		repository.delete(categoryO.get());
		return ResponseEntity.status(HttpStatus.OK).body("Category deleted successfully");
	}
	

}
