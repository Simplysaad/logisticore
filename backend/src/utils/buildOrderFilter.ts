interface IOrderFilter {
  companyId?: string;
  status?: string | string[];
  state?: string;
  // Add other filterable fields
}

// Extract and build filter from req.query
const buildOrderFilter = (query: any): any => {
  const filter: any = {};

  // Direct field mapping (single values)
  if (query.companyId) filter.companyId = query.companyId;

  // Status array support
  if (query.status) {
    const statuses = Array.isArray(query.status)
      ? query.status
      : [query.status];
    filter.status = { $in: statuses };
  }

  // Nested field with $or logic (sender/receiver state)
  if (query.state) {
    filter.$or = [
      { "sender.address.state": query.state },
      { "receiver.address.state": query.state }
    ];
  }

  // Date range example
  if (query.startDate || query.endDate) {
    filter.createdAt = {};
    if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
    if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
  }

  return Object.keys(filter).length > 0 ? filter : {};
};