// Package repository provides implementaitions of respositories.
package repository

import "gorm.io/gorm"

type repository[T any] struct {
	db *gorm.DB
}

// Create - creates entity of T.
func (r *repository[T]) Create(entity *T) error {
	return r.db.Create(entity).Error
}

// Update - updates entity of T.
func (r *repository[T]) Update(entity *T) error {
	return r.db.Save(entity).Error
}

// Delete - deletes entity of T.
func (r *repository[T]) Delete(entity *T) error {
	return r.db.Delete(entity).Error
}

// FindByID - gets entity of T by ID.
func (r *repository[T]) FindByID(id uint) (entity *T, err error) {
	err = r.db.Where("id = ?", id).Take(entity).Error
	return
}

// GetAll - gets all entity of T.
func (r *repository[T]) GetAll() (entities []T, err error) {
	err = r.db.Find(&entities).Error
	return
}
