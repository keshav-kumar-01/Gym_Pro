const { createError } = require('../utils/error.utils');
const { supabase } = require('../config/supabase');

const getAllMembers = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('members').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(createError(500, 'Error retrieving members', error));
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return next(createError(404, 'Member not found'));

    res.status(200).json(data);
  } catch (error) {
    next(createError(500, 'Error retrieving member', error));
  }
};

const createMember = async (req, res, next) => {
  try {
    const memberData = { ...req.body, joinDate: new Date().toISOString(), status: 'Active' };
    const { data, error } = await supabase
      .from('members')
      .insert([memberData])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(createError(500, 'Error creating member', error));
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('members')
      .update(req.body)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return next(createError(404, 'Member not found'));

    res.status(200).json(data[0]);
  } catch (error) {
    next(createError(500, 'Error updating member', error));
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('members').delete().eq('id', id);

    if (error) throw error;
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    next(createError(500, 'Error deleting member', error));
  }
};

const getMemberAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('memberId', id)
      .order('checkInTime', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(createError(500, 'Error retrieving attendance', error));
  }
};

const getMemberPayments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('memberId', id)
      .order('paymentDate', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    next(createError(500, 'Error retrieving payments', error));
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  getMemberAttendance,
  getMemberPayments,
};
