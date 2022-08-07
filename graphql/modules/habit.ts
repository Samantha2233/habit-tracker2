import { objectType, inputObjectType, queryField, mutationField, arg, list, nonNull } from 'nexus';

import { isAdmin } from '@/services/permissions';

// Habit Type
export const Habit = objectType({
  name: 'Habit',
  description: 'A Habit',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('userId');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.string('icon');
    t.nonNull.string('color');
    t.nonNull.string('timeOfDay');
    t.nonNull.json('recurrence');
    // t.nonNull.int('streak');
    t.nonNull.int('totalComplete');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
  },
});

// Queries
export const habitsQuery = queryField('habits', {
  type: list(Habit),
  description: 'Returns a list of habits',
  authorize: (_root, _args, _ctx) => true,
  resolve: async (_root, _args, _ctx) => {
    try {
      const habits = await prisma?.habit.findMany();
      return habits;
    } catch (err: any) {
      throw new Error(`Error fetching habits: ${err.message}`);
    }
  },
});

// export const findHabitsQuery = queryField('habits', {
//   type: list('Habit'),
//   authorize: (_root, _args, ctx) => !!ctx.user,
//   args: {
//     where: arg({ type: 'HabitWhereInput' }),
//     orderBy: arg({ type: 'HabitOrderByInput', list: true }),
//   },
//   description: 'Returns found habits',
//   resolve: async (_root, args, ctx) => {
//     const { where = {}, orderBy = [] } = args;

//     return await ctx.db.habit.findMany({ where, orderBy });
//   },
// });

// export const findUniqueHabitQuery = queryField('habit', {
//   type: 'Habit',
//   description: 'Returns a specific Habit',
//   authorize: (_root, _args, ctx) => !!ctx.user,
//   args: {
//     where: nonNull(arg({ type: 'HabitWhereUniqueInput' })),
//   },
//   resolve: (_root, args, ctx) => {
//     // ctx.prisma.habit.findMany({include: {user}})
//     const { where } = args;
//     return ctx.prisma.habit.findUnique({ where });
//   },
// });

// Mutations
export const createHabitMutation = mutationField('createHabit', {
  type: 'Habit',
  description: 'Creates a Habit',
  // authorize: (_root, _args, ctx) => !!ctx.user,
  args: {
    data: nonNull(arg({ type: 'HabitInput' })),
  },
  resolve: async (_root, args, ctx) => {
    return await ctx.db.habit.create(args);
  },
});

export const updateHabitMutation = mutationField('updateHabit', {
  type: 'Habit',
  description: 'Updates a Habit',
  authorize: (_root, _args, ctx) => isAdmin(ctx.user),
  args: {
    where: nonNull(arg({ type: 'HabitWhereUniqueInput' })),
    data: nonNull(arg({ type: 'UpdateHabitInput' })),
  },
  resolve: async (_root, args, ctx) => {
    const { where, data } = args;

    console.log('args', args);

    return await ctx.db.habit.update({ where, data });
  },
});

// MUTATION INPUTS
export const CreateHabitInput = inputObjectType({
  name: 'CreateHabitInput',
  description: 'Input used to create a habit',
  definition: (t) => {
    t.nonNull.string('userId');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.string('icon');
    t.nonNull.string('color');
    t.nonNull.json('recurrence');
    t.nonNull.string('timeOfDay');
    t.nonNull.int('totalComplete');
  },
});

export const UpdateHabitInput = inputObjectType({
  name: 'UpdateHabitInput',
  description: 'Input used to update a habit',
  definition: (t) => {
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.string('icon');
    t.nonNull.string('color');
    t.nonNull.json('recurrence');
    t.nonNull.string('timeOfDay');
    t.nonNull.int('totalComplete');
  },
});

// QUERY INPUTS
export const HabitOrderByInput = inputObjectType({
  name: 'HabitOrderByInput',
  description: 'Order habit by a specific field',
  definition(t) {
    t.field('name', { type: 'SortOrder' });
  },
});

export const HabitWhereUniqueInput = inputObjectType({
  name: 'HabitWhereUniqueInput',
  description: 'Input to find habits based on unique fields',
  definition(t) {
    t.id('id');
    // add DB uniq fields here
    // t.string('name');
  },
});

export const HabitWhereInput = inputObjectType({
  name: 'HabitWhereInput',
  description: 'Input to find habits based on other fields',
  definition(t) {
    t.field('name', { type: 'StringFilter' });
  },
});

export const HabitInput = inputObjectType({
  name: 'HabitInput',
  description: 'A habit',
  definition(t) {
    t.string('id');
    t.nonNull.string('userId');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.string('icon');
    t.nonNull.string('color');
    t.nonNull.json('recurrence');
    t.nonNull.string('timeOfDay');
    t.nonNull.int('totalComplete');
  },
});
